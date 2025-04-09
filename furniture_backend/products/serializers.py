from rest_framework import serializers
from .models import (
    Category, Feature, Product,
    ColorOption, MaterialOption, ChairTypeOption, ChairTypeFeature,
    LeatherTypeOption, BaseDesignOption, WheelDesignOption, ArmrestOption
)


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for the Category model, converts model instances to JSON
    """
    class Meta:
        model = Category
        fields = '__all__'


class FeatureSerializer(serializers.ModelSerializer):
    """
    Serializer for the Feature model, converts model instances to JSON
    """
    class Meta:
        model = Feature
        fields = '__all__'


class ProductListSerializer(serializers.ModelSerializer):
    """
    Serializer for listing Products with minimal information
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image_url', 'category_name', 'is_active', 'stock']


class ProductDetailSerializer(serializers.ModelSerializer):
    """
    Detailed Product serializer with nested category and features information
    """
    category = CategorySerializer(read_only=True)
    features = FeatureSerializer(many=True, read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )
    feature_ids = serializers.PrimaryKeyRelatedField(
        queryset=Feature.objects.all(),
        many=True,
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'stock', 
            'category', 'features', 'image_url', 'created_at',
            'updated_at', 'is_active', 'category_id', 'feature_ids'
        ]
    
    def create(self, validated_data):
        feature_ids = validated_data.pop('feature_ids', [])
        product = Product.objects.create(**validated_data)
        product.features.set(feature_ids)
        return product
    
    def update(self, instance, validated_data):
        feature_ids = validated_data.pop('feature_ids', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        
        if feature_ids is not None:
            instance.features.set(feature_ids)
        
        return instance


# Chair Customization Serializers

class ColorOptionSerializer(serializers.ModelSerializer):
    """
    Serializer for the ColorOption model
    """
    class Meta:
        model = ColorOption
        fields = ['id', 'name', 'hex_code']


class MaterialOptionSerializer(serializers.ModelSerializer):
    """
    Serializer for the MaterialOption model
    """
    class Meta:
        model = MaterialOption
        fields = ['id', 'name', 'image', 'description']


class ChairTypeFeatureSerializer(serializers.ModelSerializer):
    """
    Serializer for the ChairTypeFeature model
    """
    class Meta:
        model = ChairTypeFeature
        fields = ['feature']


class ChairTypeOptionSerializer(serializers.ModelSerializer):
    """
    Serializer for the ChairTypeOption model
    """
    features = serializers.SerializerMethodField()

    class Meta:
        model = ChairTypeOption
        fields = ['id', 'name', 'image', 'features']

    def get_features(self, obj):
        """
        Get features as a list of strings
        """
        features = ChairTypeFeature.objects.filter(chair_type=obj)
        return [feature.feature for feature in features]


class LeatherTypeOptionSerializer(serializers.ModelSerializer):
    """
    Serializer for the LeatherTypeOption model
    """
    class Meta:
        model = LeatherTypeOption
        fields = ['id', 'name', 'texture', 'description']


class BaseDesignOptionSerializer(serializers.ModelSerializer):
    """
    Serializer for the BaseDesignOption model
    """
    class Meta:
        model = BaseDesignOption
        fields = ['id', 'name', 'image', 'description']


class WheelDesignOptionSerializer(serializers.ModelSerializer):
    """
    Serializer for the WheelDesignOption model
    """
    class Meta:
        model = WheelDesignOption
        fields = ['id', 'name', 'image', 'description']


class ArmrestOptionSerializer(serializers.ModelSerializer):
    """
    Serializer for the ArmrestOption model
    """
    class Meta:
        model = ArmrestOption
        fields = ['id', 'name', 'material', 'description']
