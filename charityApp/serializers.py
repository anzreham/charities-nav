from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers
from .submodels.News import News
from userApp.models import Category, User, Charity
from .submodels.Appointment import BookAppointment
from .submodels.Activity import Activity, Volunteering
from .submodels.Charity import CharityLocation 
from .submodels.UserAddress import UserAddress
from userApp.serializers import UserSerializer
from .submodels.News import News

class UserAddressSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = UserAddress
        fields = ('id', 'address_1', 'address_2','city','post','country','created_at','user', 'updated_at')
    def create(self, validated_data):
        user = validated_data['user']
        user.save()
        address_1=validated_data['address_1']
        address_2=validated_data['address_2']
        city=validated_data['city']
        post=validated_data['post']
        country=validated_data['country'] 
        address = UserAddress.objects.create(address_1=address_1,address_2=address_2,city=city,post=post,country=country,user=user) 
        return address
   
class CharitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Charity
        fields = ['id', 'name','description','email','phone_number','license_file','password','created_at','updated_at','belong_category']
        
class CharityLocationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = CharityLocation
        fields = ('id', 'longitude','latitude','created_at','updated_at','user')
    def create(self, validated_data):
        user = validated_data['user']
        user.save()
        longitude=validated_data['longitude']
        latitude=validated_data['latitude']
        address = CharityLocation.objects.create(longitude=longitude,latitude=latitude,user=user) 
        return address


# class NewsSerializer(serializers.ModelSerializer):
#     user = serializers.HiddenField(default=serializers.CurrentUserDefault())
#     class Meta:
#         model = News
#         fields = ('id', 'title','content','created_at','updated_at','user') 
#     def create(self, validated_data):
#         user = validated_data['user']
#         user.save()
#         title=validated_data['title']
#         content=validated_data['content']
#         news = News.objects.create(title=title,content=content,user=user) 
#         return news



class VolunteeringSerializer(serializers.ModelSerializer): 
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    class Meta:
        model = Volunteering
        fields = ['id','user', 'activity','created_at','updated_at'] 
    def create(self, validated_data):
        user = validated_data['user']
        user.save()
        activity=validated_data['activity']
        volunteer = Volunteering.objects.create(user=user,activity=activity) 
        return volunteer
          
class  BookAppointmentSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model =  BookAppointment
        fields = ['id', 'size','amount','date','time','user','charity','category','created_at','updated_at']      
    def create(self, validated_data):
        user = validated_data['user']
        user.save()
        size=validated_data['size']
        amount=validated_data['amount']
        date=validated_data['date']
        time=validated_data['time']
        category=validated_data['category']
        charity=validated_data['charity']
        appt = BookAppointment.objects.create(size=size, amount=amount, date=date, time=time,category=category, user=user,charity=charity) 
        return appt
### updated#############

class NewsSerliazer(serializers.ModelSerializer):

    class Meta:
        model = News
        fields=['id','title','content','updated_at']
        read_only_fields = ['id']
    def create(self,validate_data,user):
        return News.objects.create(user=user,**validate_data)


    def update(self,obj,validate_date):
        if 'title' in validate_date:
            obj.title=validate_date['title']
        if 'content' in validate_date:
            obj.content=validate_date['content']
        obj.save()
        return obj

#updataed on friday 12/04/2021
class ActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Activity
        #show the user name rather than the user id
        fields = ['id', 'name','description','date','created_at','updated_at','user']  
        read_only_fields = ['id','user']
    def create(self,validate_data,user):
        return Activity.objects.create(user=user,**validate_data)


    def update(self,obj,validate_date):
        if 'name' in validate_date:
            obj.name=validate_date['name']
        if 'description' in validate_date:
            obj.description=validate_date['description']
        obj.save()
        return obj


class CharityListSerializer(serializers.ModelSerializer):
    

    class Meta:
        model=Charity
        fields =['name','description','category_name']

class CategoryListSerializer(serializers.ModelSerializer):
    

    class Meta:
        model=Category
        fields =['name']


class AppointmentSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
            ret = super().to_representation(instance)
            ret['charity'] = Charity.objects.get(id=ret['charity']).name
            return ret

    class Meta:
        model=BookAppointment
        fields =['id','description','amount','date','time','charity','accepted','user']
        read_only_fields = ['id','accepted']
        extra_kwargs = {'user': {'write_only': True,'required':False}}


class AppointmentSerializer2(serializers.ModelSerializer):
    

    class Meta:
        model=BookAppointment
        fields =['id','description','amount','date','time','charity','accepted']
        read_only_fields = ['id','accepted']


class CharityLocationSerializer(serializers.ModelSerializer):

    class Meta:
        model=CharityLocation
        fields=['longitude','latitude','charity_name']
        read_only_fields = ['charity_name']


