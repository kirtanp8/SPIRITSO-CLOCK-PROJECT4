import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from .models import User
from django.conf import settings
from jwt_auth.serializers.populated import PopulatedUserSerializer
import jwt
from recipes.models import Recipe

from .serializers.common import UserSerializer
User = get_user_model()


class SavedView(APIView):
    def get(self, request):
        user = request.user
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)


class SavedDetailView(APIView):
    def put(self, request, pk):
        recipe = Recipe.objects.get(id=pk)
        user = request.user
        user.saved.remove(recipe)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)


class UserProfileDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = User.objects.get(pk=request.user.id)
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)


class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({
                'message': 'Registration Successful!'
            },
                status=status.HTTP_200_OK
            )
        return Response(user_to_create.errors,
                        status=status.HTTP_422_UNPROCESSABLE_ENTITY
                        )


class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")

        if not user_to_login.check_password(password):
            raise PermissionDenied(detail="Invalid Credentials")

        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return Response({'username': user_to_login.username, 'id': user_to_login.id, 'token': token, 'message':
                        f"Welcome back, {user_to_login.username}!"},
                        status=status.HTTP_200_OK)
