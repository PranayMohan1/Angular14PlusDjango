from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.contrib.auth import get_user_model
from collections import namedtuple

x = namedtuple('User', ['username', 'email', 'password', 'first_name', 'last_name'])


class UserSerializer(serializers.ModelSerializer):
    userid = serializers.IntegerField(required=False)
    role = serializers.CharField(required=False)
    isActive = serializers.BooleanField(required=False)

    class Meta:
        model = User
        fields = "__all__"

    def validate(self, data):
        return data

    def update(self, instance, validated_data):
        updation_data = {
            "is_staff": True if (validated_data.get("role", None) in ["staff", "admin"] and validated_data.get("isActive", False)) else False,
            "is_superuser": True if (validated_data.get("role", None) == "admin" and validated_data.get("isActive",
                                                                                                        False)) else False,
            "is_active": True if validated_data.get("isActive", False) else False
        }
        User.objects.filter(id=instance.pk).update(**updation_data)
        user = User.objects.filter(id=instance.pk).first()
        return user

    def create(self, validated_data):
        user_data = x(
            last_name=validated_data.get("userid", " "),
            first_name=validated_data.get("username", " "),
            password=validated_data.get("password"),
            email=validated_data.get("email", None),
            username=validated_data.get("username")
        )

        user = get_user_model().objects.create_user(**dict(user_data._asdict()), is_active=False)
        user_obj = get_user_model().objects.filter(username=validated_data.get("username")).first()
        if user_obj:
            user_obj.set_password(validated_data.get("password"))
            user_obj.save()
        return user


class UserSummarySerializer(serializers.ModelSerializer):
    userid = serializers.SerializerMethodField(required=False)
    name = serializers.SerializerMethodField(required=False)
    isActive = serializers.SerializerMethodField(required=False)
    role = serializers.SerializerMethodField(required=False)

    class Meta:
        model = User
        fields = ["userid", "name", "password", "email", "role", "isActive"]

    @staticmethod
    def get_userid(obj):
        return obj.id if obj.id else None

    @staticmethod
    def get_name(obj):
        return obj.username if obj.username else None

    @staticmethod
    def get_isActive(obj):
        return True if obj.is_active else False

    @staticmethod
    def get_role(obj):
        if not obj.is_staff:
            return "user"
        elif obj.is_superuser:
            return "admin"
        else:
            return "staff"


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"
