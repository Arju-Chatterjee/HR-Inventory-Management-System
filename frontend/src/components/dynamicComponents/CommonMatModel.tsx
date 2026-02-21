import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ReactNode } from 'react';

interface MatModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    children: ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showHeader?: boolean;
    showCloseButton?: boolean;
}

const CommonMatModel = ({
    open,
    onClose,
    title,
    subtitle,
    children,
    maxWidth = 'md',
    showHeader = true,
    showCloseButton = true
}: MatModalProps) => {

    const widthMap = {
        xs: '400px',
        sm: '600px',
        md: '900px',
        lg: '1200px',
        xl: '1400px',
        full: '95vw'
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
            }}
        >
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: '8px',
                    boxShadow: 24,
                    width: '100%',
                    maxWidth: widthMap[maxWidth],
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    outline: 'none'
                }}
            >
                {/* Header */}
                {showHeader && (
                    <Box
                        sx={{
                            borderBottom: '1px solid #e5e7eb',
                            px: 3,
                            py: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0
                        }}
                    >
                        <Box>
                            {title && (
                                <Box
                                    id="modal-title"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: '#1f2937'
                                    }}
                                >
                                    {title}
                                </Box>
                            )}
                            {subtitle && (
                                <Box
                                    sx={{
                                        fontSize: '0.875rem',
                                        color: '#6b7280',
                                        mt: 0.5
                                    }}
                                >
                                    {subtitle}
                                </Box>
                            )}
                        </Box>
                        {showCloseButton && (
                            <IconButton
                                onClick={onClose}
                                sx={{
                                    color: '#9ca3af',
                                    '&:hover': {
                                        color: '#4b5563'
                                    }
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Box>
                )}

                {/* Body - Scrollable */}
                <Box
                    id="modal-description"
                    sx={{
                        px: 3,
                        py: 3,
                        overflowY: 'auto',
                        flex: 1
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Modal>
    );
};

export default CommonMatModel;