from django.contrib import admin
from .models import Usuario, Disciplina, ReservaDeAmbiente
from django.contrib.auth.admin import UserAdmin

class UsuarioAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Novos campos', {'fields':('cargo',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Cargo", {'fields':('cargo',)}),
    )

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Disciplina)
admin.site.register(ReservaDeAmbiente)