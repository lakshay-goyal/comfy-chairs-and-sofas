from django.contrib import admin
from django.urls import path
from . import views
from products.views import ProductListView, CategoryListView, FeatureListView, TopProductListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.productList, name='productList'),
    path('api/data/products', ProductListView.as_view(), name='product-list'),
    path('api/data/category', CategoryListView.as_view(), name='category-list'),
    path('api/data/features', FeatureListView.as_view(), name='feature-list'),
    path('api/data/top_products', TopProductListView.as_view(), name='top-product-list'),
]
