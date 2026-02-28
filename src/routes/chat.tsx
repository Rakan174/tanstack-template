import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { Settings } from 'lucide-react'
import {
  SettingsDialog,
  ChatMessage,
  LoadingIndicator,
  ChatInput,
  Sidebar,
  WelcomeScreen,
  TopBanner
} from '../components'
import { useConversations, useAppState, store, actions } from '../store'
import { genAIResponse, type Message } from '../utils'

function ChatPage() {
  const {
    conversations,
    currentConversationId,
    currentConversation,
    setCurrentConversationId,
    createNewConversation,
    updateConversationTitle,
    deleteConversation,
    addMessage,
  } = useConversations()

  const { isLoading, setLoading, getActivePrompt } = useAppState()

  const messages = useMemo(() => currentConversation?.messages || [], [currentConversation]);

  const [input, setInput] = useState('')
  const [editingChatId, setEditingChatId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [pendingMessage, setPendingMessage] = useState<Message | null>(null)
  const [error, setError] = useState<string | null>(null);

  const scrollToBottom = useCallback((smooth: boolean = false) => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      })
    }
  }, []);

  useEffect(() => {
    scrollToBottom(false)
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (pendingMessage && isLoading) {
      scrollToBottom(true)
    }
  }, [pendingMessage, isLoading, scrollToBottom])

  const createTitleFromInput = useCallback((text: string) => {
    const words = text.trim().split(/\s+/)
    const firstThreeWords = words.slice(0, 3).join(' ')
    return firstThreeWords + (words.length > 3 ? '...' : '')
  }, []);

  const processAIResponse = useCallback(async (conversationId: string, userMessage: Message) => {
    try {
      const activePrompt = getActivePrompt(store.state)
      let systemPrompt
      if (activePrompt) {
        systemPrompt = {
          value: activePrompt.content,
          enabled: true,
        }
      }

      const response = await genAIResponse({
        data: {
          messages: [...messages, userMessage],
          systemPrompt,
        },
      })

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No reader found in response')
      }

      const decoder = new TextDecoder()

      let done = false
      let newMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: '',
      }
      let buffer = ''
      let pendingTextQueue: string[] = []
      let isRendering = false

      const renderTextSmoothly = async () => {
        if (isRendering) return
        isRendering = true

        while (pendingTextQueue.length > 0) {
          const chunk = pendingTextQueue.shift()!
          const isCodeBlock = newMessage.content.includes('```') &&
                             newMessage.content.split('```').length % 2 === 0
          const charsPerFrame = isCodeBlock ? 5 : 2
          const delay = isCodeBlock ? 2 : 5

          for (let i = 0; i < chunk.length; i += charsPerFrame) {
            const slice = chunk.slice(i, i + charsPerFrame)
            newMessage = { ...newMessage, content: newMessage.content + slice }
            setPendingMessage({ ...newMessage })
            await new Promise(resolve => setTimeout(resolve, delay))
          }
        }
        isRendering = false
      }

      const scheduleUIUpdate = (text: string) => {
        pendingTextQueue.push(text)
        renderTextSmoothly()
      }

      while (!done) {
        const out = await reader.read()
        done = out.done
        if (!done && out.value) {
          buffer += decoder.decode(out.value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''
          for (const line of lines) {
            if (line.trim()) {
              try {
                const json = JSON.parse(line)
                if (json.type === 'content_block_delta' && json.delta?.text) {
                  scheduleUIUpdate(json.delta.text)
                }
              } catch (e) {
                console.error('Error parsing streaming response:', e, 'Line:', line)
              }
            }
          }
        }
      }

      while (pendingTextQueue.length > 0 || isRendering) {
        await new Promise(resolve => setTimeout(resolve, 50))
      }

      setPendingMessage(null)
      if (newMessage.content.trim()) {
        await addMessage(conversationId, newMessage)
      }
    } catch (error) {
      console.error('Error in AI response:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: 'Sorry, I encountered an error generating a response. Please set the required API keys in your environment variables.',
      }
      await addMessage(conversationId, errorMessage)
    }
  }, [messages, getActivePrompt, addMessage]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const currentInput = input
    setInput('')
    setLoading(true)
    setError(null)

    const conversationTitle = createTitleFromInput(currentInput)

    try {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user' as const,
        content: currentInput.trim(),
      }

      let conversationId = currentConversationId

      if (!conversationId) {
        try {
          const convexId = await createNewConversation(conversationTitle)
          if (convexId) {
            conversationId = convexId
            await addMessage(conversationId, userMessage)
          } else {
            const tempId = Date.now().toString()
            const tempConversation = { id: tempId, title: conversationTitle, messages: [] }
            actions.addConversation(tempConversation)
            conversationId = tempId
            actions.addMessage(conversationId, userMessage)
          }
        } catch (error) {
          console.error('Error creating conversation:', error)
          throw new Error('Failed to create conversation')
        }
      } else {
        await addMessage(conversationId, userMessage)
      }

      await processAIResponse(conversationId, userMessage)

    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: 'Sorry, I encountered an error processing your request.',
      }
      if (currentConversationId) {
        await addMessage(currentConversationId, errorMessage)
      } else {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred.')
        }
      }
    } finally {
      setLoading(false)
    }
  }, [input, isLoading, createTitleFromInput, currentConversationId, createNewConversation, addMessage, processAIResponse, setLoading]);

  const handleNewChat = useCallback(() => {
    createNewConversation()
  }, [createNewConversation]);

  const handleDeleteChat = useCallback(async (id: string) => {
    await deleteConversation(id)
  }, [deleteConversation]);

  const handleUpdateChatTitle = useCallback(async (id: string, title: string) => {
    await updateConversationTitle(id, title)
    setEditingChatId(null)
    setEditingTitle('')
  }, [updateConversationTitle]);

  return (
    <div className="relative flex h-screen bg-gray-900">
      <div className="absolute z-50 top-5 right-5">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center justify-center w-10 h-10 text-white transition-opacity rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        handleNewChat={handleNewChat}
        setCurrentConversationId={setCurrentConversationId}
        handleDeleteChat={handleDeleteChat}
        editingChatId={editingChatId}
        setEditingChatId={setEditingChatId}
        editingTitle={editingTitle}
        setEditingTitle={setEditingTitle}
        handleUpdateChatTitle={handleUpdateChatTitle}
      />

      <div className="flex flex-col flex-1">
        <TopBanner />
        {error && (
          <p className="w-full max-w-3xl p-4 mx-auto font-bold text-violet-400">{error}</p>
        )}
        {currentConversationId ? (
          <>
            <div
              ref={messagesContainerRef}
              className="flex-1 pb-24 overflow-y-auto messages-container"
            >
              <div className="w-full max-w-3xl px-4 mx-auto">
                {[...messages, pendingMessage]
                  .filter((message): message is Message => message !== null)
                  .map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isStreaming={message === pendingMessage && isLoading}
                    />
                  ))}
                {isLoading && <LoadingIndicator />}
              </div>
            </div>

            <ChatInput
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </>
        ) : (
          <WelcomeScreen
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </div>

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  )
}

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})
