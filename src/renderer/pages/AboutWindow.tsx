import {
    Button,
    Paper,
    Badge,
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    useTheme,
} from '@mui/material'
import iconPNG from '../static/icon.png'
import { useTranslation } from 'react-i18next'
import platform from '../packages/platform'
import useVersion from '../hooks/useVersion'
import * as atoms from '../stores/atoms'
import { useAtomValue } from 'jotai'

interface Props {
    open: boolean
    close(): void
}

export default function AboutWindow(props: Props) {
    const { t } = useTranslation()
    const theme = useTheme()
    const language = useAtomValue(atoms.languageAtom)
    const versionHook = useVersion()
    return (
        <Dialog open={props.open} onClose={props.close} fullWidth>
            <DialogTitle>{t('About IChat')}</DialogTitle>
            <DialogContent>
                <Box sx={{ textAlign: 'center', padding: '0 20px' }}>
                    <img src={iconPNG} style={{ width: '100px', margin: 0, display: 'inline-block' }} />
                    <h3 style={{ margin: '4px 0 5px 0' }}>IChat
                        {
                            /\d/.test(versionHook.version)
                                ? `(v${versionHook.version})`
                                : ''
                        }
                    </h3>
                    <p className="p-0 m-0">{t('about-slogan')}</p>
                    <p className="p-0 m-0 opacity-60 text-xs">{t('about-introduction')}</p>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>{t('close')}</Button>
            </DialogActions>
        </Dialog>
    )
}
