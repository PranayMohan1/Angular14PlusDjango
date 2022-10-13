# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from ..userprofile.serializers import UserSerializer, GroupSerializer, UserSummarySerializer
from ..userprofile.filters import UserFilter, GroupFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework import response


class DeleteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = UserFilter


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSummarySerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = UserFilter

    @action(methods=['POST'], detail=False)
    def register(self, request):
        # data = {"username":"xyz","email":"xyz@gmail.com,"password":"asdddd"}
        request_data = request.data.copy()
        serializer = UserSerializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save()
        return response.Response({"result": "pass"})

    @action(methods=['POST'], detail=False)
    def ActivateUser(self, request):
        request_data = request.data.copy()
        print("1")
        print(request.headers)
        print("1")
        userid = request_data.pop("userid", None)
        if userid is None:
            return response.Response({"result": "fail"})
        obj = User.objects.filter(id=userid).first()
        serializer = UserSerializer(instance=obj, data=request_data, partial=True)
        serializer.is_valid(raise_exception=True)
        new_obj = serializer.save()
        return response.Response({"result": "pass"})

    @action(methods=['GET'], detail=False)
    def roles(self, request):
        print(request.headers)
        return response.Response(["staff", "admin", "user"])

    @action(methods=['POST'], detail=False)
    def login(self, request):
        # data = {"username":"xyz","email":"xyz@gmail.com,"password":"asdddd"}
        request_data = request.data.copy()
        print(request_data)
        user = User.objects.filter(username=request_data.get("username", None), is_active=True).first()

        print(user)
        if user and user.check_password(request_data.get("Password", None)):
            data = UserSummarySerializer(user).data
            return response.Response({"jwtToken": data["role"]})
        else:
            return response.Response(None)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = GroupFilter
