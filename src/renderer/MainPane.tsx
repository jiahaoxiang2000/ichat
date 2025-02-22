import { Box } from '@mui/material'
import * as atoms from './stores/atoms'
import { useAtomValue } from 'jotai'
import InputBox from './components/InputBox'
import MessageList from './components/MessageList'
import { drawerWidth } from './Sidebar'
import Header from './components/Header'
import { sidebarVisibleAtom } from './stores/atoms'
import { Resizable } from 'react-resizable'
import { useState } from 'react'
import 'react-resizable/css/styles.css'

interface Props { }

export default function MainPane(props: Props) {
    const currentSession = useAtomValue(atoms.currentSessionAtom)
    const sidebarVisible = useAtomValue(sidebarVisibleAtom)
    const [inputBoxHeight, setInputBoxHeight] = useState(200)

    const onResize = (e: React.SyntheticEvent, { size }: { size: { width: number; height: number } }) => {
        setInputBoxHeight(size.height)
    }

    return (
        <Box
            className="h-full w-full"
            sx={{
                flexGrow: 1,
                marginLeft: sidebarVisible ? `${drawerWidth}px` : '48px',
                transition: 'margin-left 0.2s ease-in-out',
            }}
        >
            <div className="flex flex-col h-full relative">
                <Header />
                <div className="flex-grow overflow-hidden">
                    <MessageList />
                </div>
                <Resizable
                    height={inputBoxHeight}
                    width={Infinity}
                    onResize={onResize}
                    resizeHandles={['n']}
                    handle={<div className="absolute top-0 w-full h-2 cursor-row-resize hover:bg-gray-200/50" />}
                >
                    <div style={{ height: inputBoxHeight }}>
                        <InputBox
                            currentSessionId={currentSession.id}
                            currentSessionType={currentSession.type || 'chat'}
                        />
                    </div>
                </Resizable>
            </div>
        </Box>
    )
}
