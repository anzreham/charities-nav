from django.contrib import admin

from.submodels.News import News
from.submodels.Activity import Activity
from .submodels.Appointment import BookAppointment
from .submodels.Charity import CharityLocation
# Register your models here.
@admin.register(News)
class NewsAdmin(admin.ModelAdmin):

    list_display = ['id','title', 'content','created_at','updated_at','user']

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):

    list_display = ['id','name', 'description','date','created_at', 'updated_at', 'user']



@admin.register(BookAppointment)
class BookAppointmentAdmin(admin.ModelAdmin):

    list_display = ['id','description', 'amount','date','time', 'updated_at','created_at', 'user','charity','accepted']

@admin.register(CharityLocation)
class CharityLocationAdmin(admin.ModelAdmin):
    list_display = ['id','longitude', 'latitude','created_at','updated_at', 'user']


