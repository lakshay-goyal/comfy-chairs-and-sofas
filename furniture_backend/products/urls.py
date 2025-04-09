from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
# Core product models
router.register(r'categories', views.CategoryViewSet)
router.register(r'features', views.FeatureViewSet)
router.register(r'products', views.ProductViewSet)

# Chair customization models
router.register(r'colors', views.ColorOptionViewSet)
router.register(r'materials', views.MaterialOptionViewSet)
router.register(r'chair-types', views.ChairTypeOptionViewSet)
router.register(r'leather-types', views.LeatherTypeOptionViewSet)
router.register(r'base-designs', views.BaseDesignOptionViewSet)
router.register(r'wheel-designs', views.WheelDesignOptionViewSet)
router.register(r'armrests', views.ArmrestOptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    # Frontend-specific endpoints for React
    path('data/products', views.frontend_products, name='frontend-products'),
    path('data/category', views.frontend_categories, name='frontend-categories'),
    path('data/features', views.frontend_features, name='frontend-features'),
    path('data/top_products', views.frontend_top_products, name='frontend-top-products'),
    
    # Chair customization endpoint
    path('data/chair-customization', views.chair_customization_options, name='chair-customization-options'),
    
    # Direct URL for products (in addition to router)
    path('products/', views.all_products, name='all-products'),
    path('products/by_category/', views.products_by_category, name='products-by-category'),
]
