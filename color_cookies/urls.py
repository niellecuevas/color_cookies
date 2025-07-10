from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView 


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='home.html')),  # Single root path
    path('cookie/', include('cookie_app.urls')),  # Prefix other app URLs
] 