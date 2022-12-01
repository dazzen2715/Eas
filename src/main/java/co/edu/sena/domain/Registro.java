package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Registro.
 */
@Entity
@Table(name = "registro")
public class Registro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "hora_ingreso", nullable = false)
    private ZonedDateTime horaIngreso;

    @NotNull
    @Column(name = "hora_salida", nullable = false)
    private ZonedDateTime horaSalida;

    @OneToMany(mappedBy = "registro")
    @JsonIgnoreProperties(value = { "tipoVehiculo", "registro" }, allowSetters = true)
    private Set<Vehiculo> vehiculos = new HashSet<>();

    @OneToMany(mappedBy = "registro")
    @JsonIgnoreProperties(value = { "registro", "cliente", "visitante", "empleado", "formaDePago" }, allowSetters = true)
    private Set<Facturacion> facturacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Registro id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getHoraIngreso() {
        return this.horaIngreso;
    }

    public Registro horaIngreso(ZonedDateTime horaIngreso) {
        this.setHoraIngreso(horaIngreso);
        return this;
    }

    public void setHoraIngreso(ZonedDateTime horaIngreso) {
        this.horaIngreso = horaIngreso;
    }

    public ZonedDateTime getHoraSalida() {
        return this.horaSalida;
    }

    public Registro horaSalida(ZonedDateTime horaSalida) {
        this.setHoraSalida(horaSalida);
        return this;
    }

    public void setHoraSalida(ZonedDateTime horaSalida) {
        this.horaSalida = horaSalida;
    }

    public Set<Vehiculo> getVehiculos() {
        return this.vehiculos;
    }

    public void setVehiculos(Set<Vehiculo> vehiculos) {
        if (this.vehiculos != null) {
            this.vehiculos.forEach(i -> i.setRegistro(null));
        }
        if (vehiculos != null) {
            vehiculos.forEach(i -> i.setRegistro(this));
        }
        this.vehiculos = vehiculos;
    }

    public Registro vehiculos(Set<Vehiculo> vehiculos) {
        this.setVehiculos(vehiculos);
        return this;
    }

    public Registro addVehiculo(Vehiculo vehiculo) {
        this.vehiculos.add(vehiculo);
        vehiculo.setRegistro(this);
        return this;
    }

    public Registro removeVehiculo(Vehiculo vehiculo) {
        this.vehiculos.remove(vehiculo);
        vehiculo.setRegistro(null);
        return this;
    }

    public Set<Facturacion> getFacturacions() {
        return this.facturacions;
    }

    public void setFacturacions(Set<Facturacion> facturacions) {
        if (this.facturacions != null) {
            this.facturacions.forEach(i -> i.setRegistro(null));
        }
        if (facturacions != null) {
            facturacions.forEach(i -> i.setRegistro(this));
        }
        this.facturacions = facturacions;
    }

    public Registro facturacions(Set<Facturacion> facturacions) {
        this.setFacturacions(facturacions);
        return this;
    }

    public Registro addFacturacion(Facturacion facturacion) {
        this.facturacions.add(facturacion);
        facturacion.setRegistro(this);
        return this;
    }

    public Registro removeFacturacion(Facturacion facturacion) {
        this.facturacions.remove(facturacion);
        facturacion.setRegistro(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Registro)) {
            return false;
        }
        return id != null && id.equals(((Registro) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Registro{" +
            "id=" + getId() +
            ", horaIngreso='" + getHoraIngreso() + "'" +
            ", horaSalida='" + getHoraSalida() + "'" +
            "}";
    }
}
