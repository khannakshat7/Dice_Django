from django.urls import path
from Dice_app import views

urlpatterns = [
    path('',views.index,name='index')
]
