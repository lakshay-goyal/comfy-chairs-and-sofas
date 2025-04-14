from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Category, Feature, Product,
    ColorOption, MaterialOption, ChairTypeOption, ChairTypeFeature,
    LeatherTypeOption, BaseDesignOption, WheelDesignOption, ArmrestOption
)
from .serializers import (
    CategorySerializer, 
    FeatureSerializer, 
    ProductListSerializer, 
    ProductDetailSerializer,
    ColorOptionSerializer,
    MaterialOptionSerializer,
    ChairTypeOptionSerializer,
    ChairTypeFeatureSerializer,
    LeatherTypeOptionSerializer,
    BaseDesignOptionSerializer,
    WheelDesignOptionSerializer,
    ArmrestOptionSerializer
)
import random


class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the Category model.
    Provides `list`, `create`, `retrieve`, `update`, and `destroy` actions.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Check if the category has products before deleting
        if instance.products.exists():
            return Response(
                {'error': 'Cannot delete category with associated products'},
                status=status.HTTP_400_BAD_REQUEST
            )
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class FeatureViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the Feature model.
    Provides `list`, `create`, `retrieve`, `update`, and `destroy` actions.
    """
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Check if the feature is associated with products before deleting
        if instance.products.exists():
            return Response(
                {'error': 'Cannot delete feature that is associated with products'},
                status=status.HTTP_400_BAD_REQUEST
            )
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the Product model.
    Provides `list`, `create`, `retrieve`, `update`, and `destroy` actions.
    Additional filtering and searching capabilities are provided.
    """
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'price', 'created_at', 'stock']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        return ProductDetailSerializer
    
    def get_queryset(self):
        queryset = Product.objects.all()
        
        # Filter by price range if provided in query parameters
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
            
        # Filter by features if provided in query parameters
        features = self.request.query_params.getlist('feature')
        if features:
            for feature_id in features:
                queryset = queryset.filter(features__id=feature_id)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """
        Custom endpoint to get products grouped by category
        """
        categories = Category.objects.all()
        result = {}
        
        for category in categories:
            products = Product.objects.filter(category=category)
            serializer = ProductListSerializer(products, many=True)
            result[category.name] = serializer.data
            
        return Response(result)
    
    @action(detail=True, methods=['post'])
    def update_stock(self, request, pk=None):
        """
        Custom endpoint to update product stock
        """
        product = self.get_object()
        stock = request.data.get('stock')
        
        if stock is None:
            return Response(
                {'error': 'Stock value is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            stock = int(stock)
            if stock < 0:
                return Response(
                    {'error': 'Stock cannot be negative'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            product.stock = stock
            product.save()
            serializer = self.get_serializer(product)
            return Response(serializer.data)
        except ValueError:
            return Response(
                {'error': 'Stock must be a valid integer'},
                status=status.HTTP_400_BAD_REQUEST
            )


# Chair Customization ViewSets
class ColorOptionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the ColorOption model.
    Provides `list`, `create`, `retrieve`, `update`, and `destroy` actions.
    """
    queryset = ColorOption.objects.all()
    serializer_class = ColorOptionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_at']


class MaterialOptionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the MaterialOption model.
    Provides `list`, `create`, `retrieve`, `update`, and `destroy` actions.
    """
    queryset = MaterialOption.objects.all()
    serializer_class = MaterialOptionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']


class ChairTypeOptionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the ChairTypeOption model.
    Provides `list`, `create`, `retrieve`, `update`, and `destroy` actions.
    """
    queryset = ChairTypeOption.objects.all()
    serializer_class = ChairTypeOptionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_at']
    
    @action(detail=True, methods=['post'])
    def add_feature(self, request, pk=None):
        """
        Add a feature to a chair type
        """
        chair_type = self.get_object()
        feature_text = request.data.get('feature')
        
        if not feature_text:
            return Response(
                {'error': 'Feature text is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Create the chair type feature
        chair_type_feature = ChairTypeFeature.objects.create(
            chair_type=chair_type,
            feature=feature_text
        )
        
        serializer = ChairTypeFeatureSerializer(chair_type_feature)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['delete'])
    def remove_feature(self, request, pk=None):
        """
        Remove a feature from a chair type
        """
        chair_type = self.get_object()
        feature_text = request.data.get('feature')
        
        if not feature_text:
            return Response(
                {'error': 'Feature text is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Try to find and delete the feature
        try:
            feature = ChairTypeFeature.objects.get(chair_type=chair_type, feature=feature_text)
            feature.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ChairTypeFeature.DoesNotExist:
            return Response(
                {'error': 'Feature not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class LeatherTypeOptionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the LeatherTypeOption model.
    Provides `list`, `create`, `retrieve`, `update`, and `destroy` actions.
    """
    queryset = LeatherTypeOption.objects.all()
    serializer_class = LeatherTypeOptionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']


class BaseDesignOptionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the BaseDesignOption model.
    Provides `list`, `create`, `retrieve`, `update`, and `destroy` actions.
    """
    queryset = BaseDesignOption.objects.all()
    serializer_class = BaseDesignOptionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']


class WheelDesignOptionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the WheelDesignOption model.
    Provides `list`, `create`, `retrieve`, `update`, and `destroy` actions.
    """
    queryset = WheelDesignOption.objects.all()
    serializer_class = WheelDesignOptionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']


class ArmrestOptionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the ArmrestOption model.
    Provides `list`, `create`, `retrieve`, `update`, and `destroy` actions.
    """
    queryset = ArmrestOption.objects.all()
    serializer_class = ArmrestOptionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'material', 'description']
    ordering_fields = ['name', 'created_at']


# Chair Customization API Routes
@api_view(['GET'])
def chair_customization_options(request):
    """
    API endpoint for retrieving all chair customization options
    """
    colors = ColorOption.objects.all()
    materials = MaterialOption.objects.all()
    chair_types = ChairTypeOption.objects.all()
    leather_types = LeatherTypeOption.objects.all()
    base_designs = BaseDesignOption.objects.all()
    wheel_designs = WheelDesignOption.objects.all()
    armrests = ArmrestOption.objects.all()
    
    # Transform to the format expected by the frontend
    return Response({
        'colors': ColorOptionSerializer(colors, many=True).data,
        'materials': MaterialOptionSerializer(materials, many=True).data,
        'chair_types': ChairTypeOptionSerializer(chair_types, many=True).data,
        'leather_types': LeatherTypeOptionSerializer(leather_types, many=True).data,
        'base_designs': BaseDesignOptionSerializer(base_designs, many=True).data,
        'wheel_designs': WheelDesignOptionSerializer(wheel_designs, many=True).data,
        'armrests': ArmrestOptionSerializer(armrests, many=True).data
    })


# Direct API routes for product data
@api_view(['GET'])
def all_products(request):
    """API endpoint for getting all products"""
    products = Product.objects.filter(is_active=True)
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def products_by_category(request):
    """API endpoint for getting products grouped by category"""
    categories = Category.objects.all()
    result = {}
    
    for category in categories:
        products = Product.objects.filter(category=category, is_active=True)
        serializer = ProductListSerializer(products, many=True)
        result[category.name] = serializer.data
        
    return Response(result)

# Frontend-specific API routes
@api_view(['GET'])
def frontend_products(request):
    """API endpoint for the frontend products page"""
    products = Product.objects.filter(is_active=True)
    
    # Transform to the format expected by the frontend
    transformed_products = []
    for product in products:
        # Get feature names
        feature_names = [feature.name for feature in product.features.all()]
        
        # Create a mock object with dimensions and colors for frontend compatibility
        transformed_product = {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': float(product.price),
            'category': product.category.name.lower(),
            'image': product.image_url or 'https://via.placeholder.com/300',
            'stock': product.stock,
            'rating': 4.5,  # Placeholder rating until we add rating model
            'features': feature_names,
            'dimensions': {
                'width': '80 cm',
                'height': '120 cm', 
                'depth': '60 cm'
            },
            'colors': ['Black', 'Brown', 'White']  # Placeholder colors
        }
        transformed_products.append(transformed_product)
    
    return Response({'products': transformed_products})

@api_view(['GET'])
def frontend_categories(request):
    """API endpoint for the frontend categories"""
    categories = Category.objects.all()
    
    # Transform to the format expected by the frontend
    transformed_categories = []
    category_images = {
        'Director Chair':'https://res.cloudinary.com/dkiktv5ur/image/upload/v1744176030/my-sequence-uploads/wcyxo7mlgy6ttwc1gwwh.png',
        'Executive Chairs':'https://res.cloudinary.com/dkiktv5ur/image/upload/v1744176164/my-sequence-uploads/pkpcd3tjycmlq9knuxrd.png',
        'Mesh Chairs':'https://res.cloudinary.com/dkiktv5ur/image/upload/v1744455616/Heeman_Product_Images/xelgogcka4cqggrlqaxb.png',
        'Computer Chairs':'https://res.cloudinary.com/dkiktv5ur/image/upload/v1744455693/Heeman_Product_Images/i6zbgp6b8he6qtc4mcyl.png',
        'Visitor Chairs':'https://res.cloudinary.com/dkiktv5ur/image/upload/v1744455736/Heeman_Product_Images/wtbd87o9scf1cl02llix.png',
        'Restaurant Chairs':'https://res.cloudinary.com/dkiktv5ur/image/upload/v1744455773/Heeman_Product_Images/rmruvnxuk9czzxoss3t8.png',
        'Lounge Chairs':'https://res.cloudinary.com/dkiktv5ur/image/upload/v1744455864/Heeman_Product_Images/m0pkfscpe6vdgeosazay.png',
        'Student Chairs':'https://res.cloudinary.com/dkiktv5ur/image/upload/v1744455935/Heeman_Product_Images/fdvfl6kawkvntkahxxkr.png',
        'Auditorium Chair':'https://res.cloudinary.com/dkiktv5ur/image/upload/v1744455961/Heeman_Product_Images/udnc2hxjd8uatytwqvm1.png',
        'Sofa Series':'https://res.cloudinary.com/dkiktv5ur/image/upload/v1744455982/Heeman_Product_Images/weflflfx8do5rqwecvwn.png',
        'Office Table':'https://res.cloudinary.com/dkiktv5ur/image/upload/v1744456001/Heeman_Product_Images/fp4eqo61copmpo51fkpv.png'
    }
    
    for category in categories:
        image_url = category_images.get(category.name, 'https://via.placeholder.com/300')
        
        transformed_category = {
            'id': category.id,
            'name': category.name,
            'description': category.description,
            'image': image_url,
            'product_count': category.products.count()
        }
        transformed_categories.append(transformed_category)
    
    return Response({'categories': transformed_categories})

@api_view(['GET'])
def frontend_features(request):
    """API endpoint for the frontend features"""
    features = Feature.objects.all()
    
    # Transform to the format expected by the frontend
    transformed_features = []
    for feature in features:
        transformed_feature = {
            'id': feature.id,
            'name': feature.name,
            'description': feature.description,
            'product_count': feature.products.count()
        }
        transformed_features.append(transformed_feature)
    
    return Response({'features': transformed_features})

@api_view(['GET'])
def frontend_top_products(request):
    """API endpoint for top products on the frontend"""
    # Get all active products
    products = Product.objects.filter(is_active=True)
    
    # Select random products as top products (in a real app, this would be based on ratings/sales)
    top_product_count = min(6, products.count())
    random_products = random.sample(list(products), top_product_count) if products.exists() else []
    
    # Transform to the format expected by the frontend
    transformed_products = []
    for product in random_products:
        transformed_product = {
            'id': product.id,
            'name': product.name,
            'price': float(product.price),
            'category': product.category.name.lower(),
            'image': product.image_url or 'https://via.placeholder.com/300',
            'rating': 4.7,  # Placeholder rating
        }
        transformed_products.append(transformed_product)
    
    return Response({'top_products': transformed_products})
