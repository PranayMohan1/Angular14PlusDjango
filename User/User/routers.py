from rest_framework import routers
from .userprofile.viewsets import UserViewSet, GroupViewSet, DeleteViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'delete', DeleteViewSet)