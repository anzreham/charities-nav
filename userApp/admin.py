from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User,Client,Charity,Category


class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password', 'first_name', 'last_login')}),
        ('Permissions', {'fields': (
            'is_active', 
            'is_staff', 
            'is_superuser',
            'groups', 
            'user_permissions',
        )}),
    )
    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': ('email', 'password1', 'password2')
            }
        ),
    )

    list_display = ('email', 'first_name', 'is_staff', 'last_login','is_client','is_charity')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)


admin.site.register(User, UserAdmin)

@admin.register(Client)
class ClientProfileAdmin(admin.ModelAdmin):

    list_display = ['user', 'first_name','last_name','gender','created_at','updated_at']

@admin.register(Charity)
class CharityProfileAdmin(admin.ModelAdmin):

    list_display = ['user', 'name','description','logo','license_file','created_at','updated_at','category']
       
@admin.register(Category)  
class CatergoryAdmin(admin.ModelAdmin):
    list_display = [ 'name','created_at','updated_at']
