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
from charityApp.submodels.Charity import CharityLocation
from django import urls
from django.contrib import admin
from django.urls import path,include,re_path 
from .views import ListCategoryView, NewsApiView,NewsDetail,ActivitiesApiView, ActivityDetail,ListCharityView, ListCategoryView, \
                        ListClientAppointmentView,CreateAppointmentView,ClientAppointmentDetail,ClientAppointmentApiView,\
                            CharityLocationListView,CharityLocatioApiView
# router.register(r'news', views.NewsViewSet)
app_name='charity'

urlpatterns = [
path('news/',NewsApiView.as_view(),name='get_all_post_news'),
path('news-details/<int:pk>/',NewsDetail.as_view(),name='news'),
# path('news/<int:pk>/',NewsDetialApiView.as_view(),name='delete_update_news'),

 path('activities/',ActivitiesApiView.as_view(), name='get_all_post_activities'),
 path('activities_details/<int:pk>/',ActivityDetail.as_view(), name='activity'),

 path('charity_list/',ListCharityView.as_view(), name='charity_list'),
path('charity_locations_list/',CharityLocationListView.as_view(), name='charity_locations_list'),
path('create_charity_locations/',CharityLocatioApiView.as_view(), name='create_charity_locations'),

 path('category_list/',ListCategoryView.as_view(), name='category_list'),
 path('client_appointments_list/',ListClientAppointmentView.as_view(), name='client_appoint_list'),
  path('create_appointment/',ClientAppointmentApiView.as_view(), name='creat_appointment'),
 path('client_appointment_details/<int:pk>/',ClientAppointmentDetail.as_view(), name='client_appointment_detial'),



]
