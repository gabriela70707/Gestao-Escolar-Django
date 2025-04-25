from django.urls import path
from .views import *

urlpatterns = [
    path('login/', view=LoginView.as_view())
]