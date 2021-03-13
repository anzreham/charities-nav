from django.http import JsonResponse
from django.shortcuts import HttpResponse, redirect ,render
from rest_framework import serializers, viewsets, mixins, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from userApp.models import User,Category
from .submodels.News import News
from .submodels.UserAddress import  UserAddress
from .submodels.Appointment import BookAppointment
from .submodels.Activity import Activity, Volunteering
from .submodels.Charity import CharityLocation
from userApp.serializers import UserSerializer, CategorySerializer
from .serializers import CharityLocationSerializer,UserAddressSerializer,BookAppointmentSerializer,ActivitySerializer,\
                        VolunteeringSerializer,NewsSerliazer,CharityListSerializer,CategoryListSerializer,AppointmentSerializer,\
                            AppointmentSerializer2,CharityLocationSerializer

from rest_framework.permissions import AllowAny

from rest_framework import status

from userApp.models import Charity,Category
class UserAddressViewSet(APIView):
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer

    def get(self, request, client_id, format=None):
        try:
            client=UserAddress.objects.get(user_id=client_id)
            # current = request.user.id
            # if current != client.user_id:
            #      return Response({"errors": "You are not authorized to view this page!"})
            serializer = UserAddressSerializer(client)
            return Response(serializer.data)
        except Exception as error:
            return Response({"errors": str(error)})

    def put(self, request, client_id, format=None):
        try:
            client=UserAddress.objects.get(user_id=client_id)
            serializer = UserAddressSerializer(client,data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors) 
        except Exception as error:
            return Response({"errors": str(error)}) 


    def post(self, request, client_id,format=None):
        try:
            serializer = UserAddressSerializer(data=request.data,context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as error:
            return Response({"errors": str(error)})

class AllCharityLocationsViewSet(APIView):
    queryset = CharityLocation.objects.all()
    serializer_class = CharityLocationSerializer 
    def get(self, request, format=None):
        locations = CharityLocation.objects.all()
        serializer = CharityLocationSerializer(locations, many=True)
        return Response(serializer.data) 

class CharityLocationViewSet(APIView):
    queryset = CharityLocation.objects.all()
    serializer_class = CharityLocationSerializer

    def get(self, request, charity_id, format=None):
        try:
            charity=CharityLocation.objects.get(user_id=charity_id)
            current = request.user.id
            if current != charity.user_id:
                return Response({"errors": "You are not authorized to view this page!"})
            serializer = CharityLocationSerializer(charity)
            return Response(serializer.data)
        except Exception as error:
            return Response({"errors": str(error)})

    def post(self, request, charity_id,format=None):
        try:
            serializer = CharityLocationSerializer(data=request.data,context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as error:
            return Response({"errors": str(error)})


    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, charity_id, format=None):
        try:
            activiy=Activity.objects.filter(user=charity_id)
            serializer = ActivitySerializer(activiy, many=True)
            return Response(serializer.data)
        except Exception as error:
            return Response({"errors": str(error)})      

class VolunteeringViewSet(APIView):
    queryset = Volunteering.objects.all()
    serializer_class = VolunteeringSerializer

    def get(self, request, format=None):
        volunteers = Volunteering.objects.all()
        serializer = VolunteeringSerializer(volunteers, many=True)
        return Response(serializer.data)

    def post(self, request,format=None):
        try:
            check=User.objects.get(id=request.user.id)
            if check.is_client:
                serializer = VolunteeringSerializer(data=request.data,context={'request': request})
                if serializer.is_valid():
                    serializer.save(user=request.user)
                    return Response(serializer.data)
                return Response(serializer.errors)
            return Response({"errors": "Not allowed"})
        except Exception as error:
            return Response({"errors": str(error)})

class VolunteerDetailsViewSet(mixins.RetrieveModelMixin,mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Volunteering.objects.all()
    serializer_class = VolunteeringSerializer

    def get(self, request,pk, *args, **kwargs):
        return self.retrieve(request, pk,*args, **kwargs)

    def delete(self, request,*args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class BookAppointmentViewSet(APIView):
    queryset = BookAppointment.objects.all()
    serializer_class = BookAppointmentSerializer

    def get(self, request, format=None):
        appts = BookAppointment.objects.all()
        serializer = BookAppointmentSerializer(appts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        try:
            getUser=User.objects.get(id=request.data.get('user', request.user.id))
            if getUser.is_client:
                serializer = BookAppointmentSerializer(data=request.data,context={'request': request})
                if serializer.is_valid():
                    serializer.save(user=getUser)
                    return Response(serializer.data)
                return Response(serializer.errors)
            return Response({"errors": "Not allowed"})
        except Exception as error:
            return Response({"errors": str(error)}) 

class BookAppointmentDetailsViewSet(APIView):
    queryset = BookAppointment.objects.all()
    serializer_class = BookAppointmentSerializer

    def get(self, request, user_id, format=None):
        try:
            appt=BookAppointment.objects.filter(user=user_id)
            serializer = BookAppointmentSerializer(appt, many=True)
            return Response(serializer.data)
        except Exception as error:
            return Response({"errors": str(error)})  



## update#######
class NewsApiView(APIView):
     
    def get(self, request,format=None):

        try:
            queryset=News.objects.filter(user=request.user)
            #make sure is valid jason data 
            serializer=NewsSerliazer(queryset,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)

        except Exception as error:
            print(error)
            return Response({"errors":'bad request'},status=status.HTTP_400_BAD_REQUEST)      
    
    def post(self,request,format=None):
        try:
            serializer=NewsSerliazer(data=request.data)
            
            if serializer.is_valid():
                #news=News.objects.create(title=request.data['title'],content=request.data['content'],user=request.user)
                news=serializer.create(validate_data=request.data,user=request.user)
                ser=NewsSerliazer(instance=news)
                return Response(ser.data,status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            print('errors',error)
            return Response({"errors":'bad request'},status=status.HTTP_400_BAD_REQUEST)      


from rest_framework import generics
class NewsDetail(generics.RetrieveUpdateDestroyAPIView):
    #queryset = News.objects.filter(user=self.request.user,id=self.pk)
    serializer_class = NewsSerliazer

    def get_queryset(self):
        query=News.objects.filter(user=self.request.user,id=self.kwargs['pk'])
        return query





  
class ActivitiesApiView(APIView):
     
    def get(self, request,format=None):

        try:
            queryset=Activity.objects.filter(user=request.user)
            #make sure is valid jason data 
            serializer=ActivitySerializer(queryset,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)

        except Exception as error:
            print(error)
            return Response({"errors":'bad request'},status=status.HTTP_400_BAD_REQUEST)      
    
    def post(self,request,format=None):
        try:
            serializer=ActivitySerializer(data=request.data)
            
            if serializer.is_valid():
                #news=News.objects.create(title=request.data['title'],content=request.data['content'],user=request.user)
                activity=serializer.create(validate_data=request.data,user=request.user)
                ser=ActivitySerializer(instance=activity)
                return Response(ser.data,status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            print('errors',error)
            return Response({"errors":'bad request'},status=status.HTTP_400_BAD_REQUEST)      



class ActivityDetail(generics.RetrieveUpdateDestroyAPIView):
    #queryset = News.objects.filter(user=self.request.user,id=self.pk)
    serializer_class = ActivitySerializer

    def get_queryset(self):
        query=Activity.objects.filter(user=self.request.user,id=self.kwargs['pk'])
        return query






#class NewsDetialApiView(APIView):   
#     def get(self, request,pk,format=None):

#         try:
#             try:
#                 object=News.objects.get(user=request.user,id=pk)
#             except News.DoesNotExist:
#                     return Response({"errors":"you don't have such news"},status=status.HTTP_404_NOT_FOUND)
#             serializer=NewsSerliazer(object)
#             return Response(serializer.data,status=status.HTTP_200_OK)

#         except Exception as error:
#             print(error)
#             return Response({"errors":'bad request'},status=status.HTTP_400_BAD_REQUEST)      
    
#     def delete (self,request,pk):
#         try:
#             object=News.objects.get(user=request.user,id=pk)
#         except News.DoesNotExist:
#             return Response({"errors":"you don't have such news"},status=status.HTTP_404_NOT_FOUND)
#         if object:
#             object.delete()
#             return Response({"message":'news deleted succesufuly '},status=status.HTTP_200_OK) 
#         else:
#             return Response({"errors":"News not found"},status=status.HTTP_404_NOT_FOUND)

    
#     def put (self,request,pk):
#         try:
#             object=News.objects.get(user=request.user,id=pk)
#             serializer=NewsSerliazer(data=request.data)
#             if serializer.is_valid():
#                 news=serializer.update(obj=object,validate_date=request.data)
#                 #news=object.objects.update(**request.data)
#                 ser=NewsSerliazer(instance=news)
#                 return Response(ser.data,status=status.HTTP_200_OK)
#             else:
#                 return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
#         except News.DoesNotExist:
#             return Response({"errors":"you don't have such news"},status=status.HTTP_404_NOT_FOUND)

       
class ListCharityView(generics.ListAPIView):
    ## authentication required 
    permission_classes=[AllowAny]
    serializer_class =CharityListSerializer
    queryset = Charity.objects.all()


class ListCategoryView(generics.ListAPIView):
    ## authentication required 
    permission_classes=[AllowAny]
    serializer_class =CategoryListSerializer
    queryset = Category.objects.all()

class ListClientAppointmentView(generics.ListAPIView):
    ## authentication required 
    #permission_classes=[AllowAny]
    serializer_class =AppointmentSerializer
    #queryset = BookAppointment.objects.filter(user=self.request.user)

    def get_queryset(self):
        query=BookAppointment.objects.filter(user=self.request.user)
        return query

class CreateAppointmentView(generics.CreateAPIView):
    ## authentication required 
    #permission_classes=[AllowAny]
    serializer_class =AppointmentSerializer
    #queryset = BookAppointment.objects.filter(user=self.request.user)

    def get_queryset(self):
        query=BookAppointment.objects.filter(user=self.request.user)
        return query
  
    def get_serializer_context(self):
        context=super().get_serializer_context()
        context['user']=self.request.user
        return context

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer,user=self.request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    # def permission_denied(self, request, message=None):
    #     """
    #     If request is not permitted, determine what kind of exception to raise.
    #     """
    #     if request.authenticators and not request.successful_authenticator:
    #         raise exceptions.NotAuthenticated()
    #     raise exceptions.PermissionDenied(detail=message)

class ClientAppointmentDetail(generics.RetrieveUpdateDestroyAPIView):
    #queryset = News.objects.filter(user=self.request.user,id=self.pk)
    ## authentication required 
    #permission_classes=[AllowAny]
    serializer_class =AppointmentSerializer

    allowed_methods=['GET','PUT','DELETE']
    def get_queryset(self):
        query=BookAppointment.objects.filter(user=self.request.user,id=self.kwargs['pk'])
        return query

    
        

##########################################################################
  
class ClientAppointmentApiView(APIView):
     
    def post(self,request,format=None):
        try:
            if (not request.user.is_client):
                return Response({'message':'you do not have permissions'},status=status.HTTP_403_FORBIDDEN)
            serializer=AppointmentSerializer(data=request.data)
            
            if serializer.is_valid():
                serializer.validated_data['user']=request.user
                #print(serializer.validated_data)
                appointment=BookAppointment.objects.create(**serializer.validated_data)
                #ser=appointment(instance=appointment)
                return Response( serializer.data,status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            print('errors',error)
            return Response({"errors":'bad request'},status=status.HTTP_400_BAD_REQUEST)      


class CharityLocationListView(generics.ListAPIView):
    #paginator=None
    ## authentication required 
    permission_classes=[AllowAny]
    serializer_class =CharityLocationSerializer
    #queryset = BookAppointment.objects.filter(user=self.request.user)

    def get_queryset(self):
        query=CharityLocation.objects.all()
        return query



class CharityLocatioApiView(APIView):
     
    def post(self,request,format=None):
        try:
            if (request.user.is_client):
                return Response({'message':'you do not have permissions'},status=status.HTTP_403_FORBIDDEN)
            serializer=CharityLocationSerializer(data=request.data)
            
            if serializer.is_valid():
                serializer.validated_data['user']=request.user
                #print(serializer.validated_data)
                appointment=CharityLocation.objects.create(**serializer.validated_data)
                #ser=appointment(instance=appointment)
                return Response( serializer.data,status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            print('errors',error)
            return Response({"errors":'bad request'},status=status.HTTP_400_BAD_REQUEST)      
