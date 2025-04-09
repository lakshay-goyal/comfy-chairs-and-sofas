"""
WSGI config for furniture_backend project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'furniture_backend.settings')

application = get_wsgi_application()

# For WSGI server
if __name__ == "__main__":
    from waitress import serve
    serve(application, host="0.0.0.0", port=8000)
