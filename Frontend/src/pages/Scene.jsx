import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, IconButton, Slider, Typography, styled } from '@mui/material';
import { Fullscreen, ZoomIn, ZoomOut, RotateLeft, RotateRight } from '@mui/icons-material';

const ViewerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '70vh',
  minHeight: '500px',
  width: '100%',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: theme.shadows[10],
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  margin: '2rem 0',
}));

const ControlsContainer = styled(Box)({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '8px 16px',
  borderRadius: '40px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  zIndex: 10,
});

const LoadingOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  zIndex: 5,
});

const Cloudinary3DViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const viewerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initializeViewer = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          loadScript('https://dimensions-3d-viewer.cloudinary.com/1.0.7/all.js'),
          loadScript('https://dimensions-tag.cloudinary.com/0.0.83/all.js')
        ]);

        if (window.initDimensions) {
          const d8sApi = window.initDimensions({
            cloudName: "dkiktv5ur",
            viewers: ["3D"],
          });

          // Try multiple possible ID patterns
          const possibleIds = [
            `${id}-13-3-2025`,
            `${id}-14-3-2025`,
            `${id}-15-3-2025`,
            `${id}-16-3-2025`
          ];

          let modelLoaded = false;
          for (const modelId of possibleIds) {
            try {
              viewerRef.current.setAttribute('data-d8s-id', modelId);
              modelLoaded = true;
              break;
            } catch (e) {
              console.warn(`Model with ID ${modelId} not found`);
            }
          }

          if (!modelLoaded) {
            throw new Error('No valid model ID found');
          }

          // Add slight delay for viewer to initialize
          setTimeout(() => setIsLoading(false), 1500);
        }
      } catch (error) {
        console.error('Error loading 3D viewer:', error);
        navigate('/error', { state: { error: 'Failed to load 3D model' } });
      }
    };

    initializeViewer();

    return () => {
      // Cleanup if needed
    };
  }, [id, navigate]);

  const handleFullscreen = () => {
    if (viewerRef.current?.requestFullscreen) {
      viewerRef.current.requestFullscreen();
    }
  };

  const handleZoom = (direction) => {
    const newZoom = direction === 'in' ? zoomLevel + 10 : zoomLevel - 10;
    setZoomLevel(Math.min(Math.max(newZoom, 10), 100));
    // Here you would typically call Cloudinary's zoom API if available
  };

  const handleRotation = (direction) => {
    const newRotation = direction === 'left' ? rotation - 15 : rotation + 15;
    setRotation(newRotation);
    // Here you would typically call Cloudinary's rotation API if available
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
        3D Product Viewer
      </Typography>
      
      <ViewerContainer>
        {isLoading && (
          <LoadingOverlay>
            <CircularProgress size={60} thickness={4} sx={{ color: '#3f51b5' }} />
            <Typography variant="h6" sx={{ mt: 3, color: '#555' }}>
              Loading 3D Model...
            </Typography>
          </LoadingOverlay>
        )}

        <div
          ref={viewerRef}
          id="three-d-viewer"
          style={{ 
            height: '100%',
            width: '100%',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.5s ease'
          }}
          data-d8s-type="3d"
          data-d8s-id={`${id}-13-3-2025`}
        />

        {!isLoading && (
          <>
            <ControlsContainer>
              <IconButton onClick={() => handleZoom('out')} color="primary">
                <ZoomOut />
              </IconButton>
              
              <Slider
                value={zoomLevel}
                onChange={(e, value) => setZoomLevel(value)}
                min={10}
                max={100}
                sx={{ width: '120px' }}
                aria-label="Zoom level"
              />
              
              <IconButton onClick={() => handleZoom('in')} color="primary">
                <ZoomIn />
              </IconButton>
              
              <IconButton onClick={() => handleRotation('left')} color="primary">
                <RotateLeft />
              </IconButton>
              
              <IconButton onClick={() => handleRotation('right')} color="primary">
                <RotateRight />
              </IconButton>
              
              <IconButton onClick={handleFullscreen} color="primary">
                <Fullscreen />
              </IconButton>
            </ControlsContainer>
          </>
        )}
      </ViewerContainer>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Rotate, zoom, and explore the product in 3D
        </Typography>
      </Box>
    </Box>
  );
};

export default Cloudinary3DViewer;