from rest_framework.permissions import BasePermission

class IsGestor(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.categoria == 'G':
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.categoria == 'G':
            return True
        return obj.id == request.user.id
    

class IsCliente(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.categoria == 'P'
    
