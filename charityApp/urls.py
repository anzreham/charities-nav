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
from django import urls
from django.contrib import admin
from django.urls import path,include,re_path 
from .views import NewsApiView,NewsDetail,ActivitiesApiView, ActivityDetail
# router.register(r'news', views.NewsViewSet)
app_name='charity'

urlpatterns = [
path('news/',NewsApiView.as_view(),name='get_all_post_news'),
path('news-details/<int:pk>/',NewsDetail.as_view(),name='news'),
# path('news/<int:pk>/',NewsDetialApiView.as_view(),name='delete_update_news'),

 path('activities/',ActivitiesApiView.as_view(), name='get_all_post_activities'),
 path('activities_details/<int:pk>/',ActivityDetail.as_view(), name='activity')




]
