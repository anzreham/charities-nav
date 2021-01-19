from os import name
from django.core.validators import validate_integer
from django.db.models.expressions import Value
from rest_framework import serializers
from .models import User , Client, Charity, Category
from django.contrib.auth import password_validation
from django.contrib.auth.hashers import make_password
 
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=('id','email','phone_number','password','created_at')
        extra_kwargs = {'password': {'write_only': True}}
 
class UserSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=('id', 'email','password','is_client')
        extra_kwargs = {'password': {'write_only': True}}    

class ClientProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer() 
    class Meta:
        model = Client
        fields=('id','user','first_name','last_name','gender','created_at')

    def create(self, validated_data):
        user = validated_data['user']
        get_user=User.objects.create(is_client =True ,**user)
        get_user.set_password(user['password'])
        get_user.save()
        first_name=validated_data['first_name']
        last_name=validated_data['last_name']
        gender=validated_data['gender']
        client = Client.objects.create(user=get_user ,first_name=first_name,last_name=last_name, gender=gender) 
        return client

class CharityProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Charity
        fields=( 'id','user','name','description','logo','license_file','category')
    
    def create(self, validated_data):
        user_data = validated_data['user'] 
        get_user=User.objects.create(is_charity =True ,**user_data)
        get_user.set_password(user_data['password'])
        get_user.save()
        name=validated_data['name']
        description=validated_data['description']
        logo=validated_data['logo']
        license_file=validated_data['license_file']
        category=validated_data['category']
        charity = Charity.objects.create(user=get_user ,name=name, description=description,logo=logo,license_file=license_file,category=category) 
        return charity
 
from dj_rest_auth.registration.serializers import RegisterSerializer

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields=('first_name','last_name','gender','created_at')

    def create(validated_data ,user):
        return Client.objects.create(user=user,first_name = validated_data['first_name'],last_name= validated_data['last_name'],
                                            gender=validated_data['gender'])

class ClientRegisterSerializer(RegisterSerializer):

    client_profile=ClientSerializer(required=True)
    def custom_signup(self, request, user):
        

        ClientSerializer.create(validated_data= self.validated_data['client_profile'],user=user)
        user.is_client=True
        user.save()

class CharitySerializer(serializers.ModelSerializer):
    category =serializers.ChoiceField( 
                        choices = Category.objects.all()) 

    #category = serializers.CharField()
    class Meta:
        model = Charity
        fields=('name','description','logo','license_file','category')
    
    # def validate_category(self,value):
    #      catogeries=Category.objects.values_list('name',flat=True)
    #      if not (value in catogeries):
    #          raise serializers.ValidationError('Please insert correct catogery',code=12)
    #      else:
    #         return value

    def create(validated_data ,user):
    
        catogery =Category.objects.get(name=validated_data['category'])
        return Charity.objects.create(user=user,name = validated_data['name'],description= validated_data['description'],
                                             logo=validated_data['logo'],category=catogery,license_file=validated_data['license_file'])
  

class CharityRegisterSerializer(RegisterSerializer):

    charity_profile=CharitySerializer(required=True)
    def custom_signup(self, request, user):
        CharitySerializer.create(validated_data= self.validated_data['charity_profile'],user=user)
        user.is_charity=True
        user.save()
