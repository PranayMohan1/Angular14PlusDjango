import django_filters

from django.contrib.auth.models import User, Group


class UserFilter(django_filters.FilterSet):
    class Meta:
        model = User
        fields = {
            'id': ['exact']
        }


class GroupFilter(django_filters.FilterSet):
    class Meta:
        model = Group
        fields = {
            'id': ['exact']
        }
