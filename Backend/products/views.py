from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product, Category, Feature
from .serializers import ProductSerializer, CategorySerializer, FeatureSerializer

class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response({"products": serializer.data})
    
class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response({"categories": serializer.data})

class FeatureListView(APIView):
    def get(self, request):
        features = Feature.objects.all()
        serializer = FeatureSerializer(features, many=True)
        return Response({"features": serializer.data})

class TopProductListView(APIView):
    def get(self, request):
        top_products = Product.objects.filter(is_top=True)
        serializer = ProductSerializer(top_products, many=True)
        return Response({"top_products": serializer.data})