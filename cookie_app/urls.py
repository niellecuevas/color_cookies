from django.urls import path
from . import views

urlpatterns = [
    path('home', views.home, name='home'),
    path('', views.title_screen, name='titlescreen'),
    path('start/', views.start, name='start'),  # Start page
    path('instructions/', views.instructions, name='instructions'),  # Instructions page
    path('about/', views.about, name='about'),  # About page
] 

