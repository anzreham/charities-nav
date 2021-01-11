"""charity_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include 
from charityApp import views
from userApp import views as user_views
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
# router.register(r'news', views.NewsViewSet)
urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api/', include(router.urls)),
    path(r'api/allusers', user_views.UserViewSet.as_view()),
    path(r'api/clients/',user_views.ClientViewSet.as_view()),  
    path(r'api/charities/',user_views.CharityViewSet.as_view()), 
    path(r'api/categories/',user_views.CategoryViewSet.as_view()),  
    path(r'api/news',views.NewsViewSet.as_view()),
    path(r'api/news/<int:charity_id>/',views.NewsDetails.as_view()), #By charity
    path(r'api/news/delete/<int:pk>', views.NewsDetailsViewSetDelete.as_view()), #Delete news
    path(r'api/activites',views.ActivityViewSet.as_view()),
    path(r'api/activites/<int:charity_id>/',views.ActivityDetails.as_view()), #By charity
    path(r'api/activity/delete/<int:pk>', views.ActivityDetailsViewSetDelete.as_view()), #Delete activity
    path(r'api/volunteers',views.VolunteeringViewSet.as_view()),
    path(r'api/volunteers/<int:pk>', views.VolunteerDetailsViewSet.as_view()), 
    path(r'api/sessions/', user_views.UserSessions.as_view()),
    path(r'api/client/<int:client_id>/', user_views.ClientDetails.as_view()),
    path(r'api/charity/<int:charity_id>/', user_views.CharityDetails.as_view()),
    path(r'api/client/<int:client_id>/location/', views.UserAddressViewSet.as_view()),
    path(r'api/charity/<int:charity_id>/location/', views.CharityLocationViewSet.as_view()),
    path(r'api/appointments', views.BookAppointmentViewSet.as_view()),
    path(r'api/bookappointment/<int:user_id>', views.BookAppointmentDetailsViewSet.as_view()),
    path(r'api/charity/locations/', views.AllCharityLocationsViewSet.as_view()),     
]