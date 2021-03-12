from django.contrib import admin

from.submodels.News import News
from.submodels.Activity import Activity
# Register your models here.
@admin.register(News)
class NewsAdmin(admin.ModelAdmin):

    list_display = ['id','title', 'content','created_at','updated_at','user']

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):

    list_display = ['id','name', 'description','date','created_at', 'updated_at', 'user']




