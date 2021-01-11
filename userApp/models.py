from django.db import models
from django.utils import timezone
from django.conf import settings
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
  def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
    if not email:
        raise ValueError('Users must have an email address')
    now = timezone.now()
    email = self.normalize_email(email)
    user = self.model(
        email=email,
        is_staff=is_staff, 
        is_active=True,
        is_superuser=is_superuser, 
        last_login=now,
        date_joined=now, 
        **extra_fields
    )
    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_user(self, email, password, **extra_fields):
    return self._create_user(email, password, False, False, **extra_fields)

  def create_superuser(self, email, password, **extra_fields):
    user=self._create_user(email, password, True, True, **extra_fields)
    return user

class User(AbstractUser):
    id = models.AutoField(auto_created = True, primary_key = True, serialize = False,  verbose_name ='ID',unique=True)
    is_client = models.BooleanField(default=False)
    is_charity = models.BooleanField(default=False)
    username = None
    phone_number= models.CharField(max_length=15)
    email       = models.EmailField(unique=True)
    password    = models.CharField(max_length=120 )
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number','password']

    objects = UserManager()
    def __repr__(self):
        return f'<User object: ID:{self.id} Email:{self.email}>'

class Client(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name  = models.CharField(max_length=40)
    last_name   = models.CharField(max_length=40, blank=True, null=True)
    gender      = models.CharField(max_length=10)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)
 
    def __repr__(self):
      return f'<User object: ID:{self.id} First Name:{self.first_name} Last Name:{self.last_name}>'

class Category(models.Model):
    name        = models.CharField(max_length=40)
    created_at  = models.DateTimeField(auto_now_add=True) 
    updated_at  = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'<Category object: ID:{self.id} name:{self.name}>'
        
class Charity(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name            = models.CharField(max_length=40)
    description     = models.TextField(blank=True)
    logo            = models.CharField(max_length=120)
    license_file    = models.TextField()
    created_at      = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, related_name='charities_in_group', on_delete=models.CASCADE,null=True) 

    def __repr__(self):
        return f'<Charity object: ID:{self.id} Name:{self.name} >'

