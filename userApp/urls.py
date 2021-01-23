from django.urls import path,include,re_path
from django.views.generic import TemplateView
from allauth.account.views import signup,login,logout,password_change,password_set,email,email_verification_sent,confirm_email,\
                                password_reset,password_reset_done,password_reset_from_key,password_reset_from_key_done,account_inactive
                                    

from django.views.generic import TemplateView, RedirectView
from rest_framework_swagger.views import get_swagger_view
from dj_rest_auth.views import (
    LoginView, LogoutView, UserDetailsView, PasswordChangeView,
    PasswordResetView, PasswordResetConfirmView
)
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView

from allauth.account.views import (signup,login,logout,password_change,
                                   password_set,account_inactive,
                                   email,email_verification_sent,confirm_email,
                                   password_reset,password_reset_done,password_reset_from_key,
                                   password_reset_from_key_done,
                                   )
#from .views import CustomVerifyEmailView,CustomPasswordResetConfirmView,my_profile,MyProfileView,ProfileView,CheckProfileView,BmiView
                    
from django.contrib.auth.views import PasswordResetCompleteView,PasswordChangeDoneView,PasswordResetConfirmView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import ClientRegisterView,CharityRegisterView,TestView
app_name = 'users'
#from .views import CustomRegisterView
urlpatterns = [
    path('test/',TestView.as_view(),name='test'),

     #path('api/', include(('users.api.urls','api') ,namespace='users_api')),
     path('api/refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/profile/', ProfileView.as_view(), name='rest_user_profile'),
     

     #rest -authentication
    path('api/signup/client',ClientRegisterView.as_view(),name='client_rest_register'),
    path('api/signup/charity',CharityRegisterView.as_view(),name='client_rest_register'),

    #path('api/verify-email/', CustomVerifyEmailView.as_view(), name='rest_verify_email'),#ok in post api
    # this url is used to generate email content
    #re_path(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
     #   TemplateView.as_view(template_name="password_reset_confirm.html"),
      #  name='password_reset_confirm'),
  #  path('api/password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
   # path('api/password/reset/confirm/',CustomPasswordResetConfirmView.as_view(),name='rest_password_reset_confirm'),
    path('api/login/',LoginView.as_view(), name='rest_login'),
    # URLs that require a user to be logged in with a valid session / token.
    path('api/logout/', LogoutView.as_view(), name='rest_logout'),
   # path('api/password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
  #  path('password/reset/confirm/',CustomPasswordResetConfirmView.as_view(),name='rest_password_reset_confirm'),
    # URLs that require a user to be logged in with a valid session / token.
####################################################################################
]
    


    