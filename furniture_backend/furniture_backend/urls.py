"""
URL configuration for furniture_backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def api_root(request):
    """
    API root view that provides information about available endpoints
    """
    return JsonResponse({
        'message': 'Welcome to the Furniture API',
        'endpoints': {
            'categories': '/api/categories/',
            'features': '/api/features/',
            'products': '/api/products/',
            'products_by_category': '/api/products/by_category/',
            'admin': '/admin/'
        },
        'filtering': {
            'products_by_price': '/api/products/?min_price=X&max_price=Y',
            'products_by_category': '/api/products/?category=X',
            'products_by_features': '/api/products/?feature=X&feature=Y',
            'products_search': '/api/products/?search=keyword'
        }
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/', include('products.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
