package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Empleado.
 */
@Entity
@Table(name = "empleado")
public class Empleado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "nombre_empleado", length = 20, nullable = false, unique = true)
    private String nombreEmpleado;

    @Size(max = 20)
    @Column(name = "apellido_empleado", length = 20, unique = true)
    private String apellidoEmpleado;

    @NotNull
    @Size(max = 20)
    @Column(name = "cargo_empleado", length = 20, nullable = false, unique = true)
    private String cargoEmpleado;

    @NotNull
    @Size(max = 20)
    @Column(name = "phone", length = 20, nullable = false, unique = true)
    private String phone;

    @OneToMany(mappedBy = "empleado")
    @JsonIgnoreProperties(value = { "registro", "cliente", "visitante", "empleado", "formaDePago" }, allowSetters = true)
    private Set<Facturacion> facturacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Empleado id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreEmpleado() {
        return this.nombreEmpleado;
    }

    public Empleado nombreEmpleado(String nombreEmpleado) {
        this.setNombreEmpleado(nombreEmpleado);
        return this;
    }

    public void setNombreEmpleado(String nombreEmpleado) {
        this.nombreEmpleado = nombreEmpleado;
    }

    public String getApellidoEmpleado() {
        return this.apellidoEmpleado;
    }

    public Empleado apellidoEmpleado(String apellidoEmpleado) {
        this.setApellidoEmpleado(apellidoEmpleado);
        return this;
    }

    public void setApellidoEmpleado(String apellidoEmpleado) {
        this.apellidoEmpleado = apellidoEmpleado;
    }

    public String getCargoEmpleado() {
        return this.cargoEmpleado;
    }

    public Empleado cargoEmpleado(String cargoEmpleado) {
        this.setCargoEmpleado(cargoEmpleado);
        return this;
    }

    public void setCargoEmpleado(String cargoEmpleado) {
        this.cargoEmpleado = cargoEmpleado;
    }

    public String getPhone() {
        return this.phone;
    }

    public Empleado phone(String phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<Facturacion> getFacturacions() {
        return this.facturacions;
    }

    public void setFacturacions(Set<Facturacion> facturacions) {
        if (this.facturacions != null) {
            this.facturacions.forEach(i -> i.setEmpleado(null));
        }
        if (facturacions != null) {
            facturacions.forEach(i -> i.setEmpleado(this));
        }
        this.facturacions = facturacions;
    }

    public Empleado facturacions(Set<Facturacion> facturacions) {
        this.setFacturacions(facturacions);
        return this;
    }

    public Empleado addFacturacion(Facturacion facturacion) {
        this.facturacions.add(facturacion);
        facturacion.setEmpleado(this);
        return this;
    }

    public Empleado removeFacturacion(Facturacion facturacion) {
        this.facturacions.remove(facturacion);
        facturacion.setEmpleado(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empleado)) {
            return false;
        }
        return id != null && id.equals(((Empleado) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Empleado{" +
            "id=" + getId() +
            ", nombreEmpleado='" + getNombreEmpleado() + "'" +
            ", apellidoEmpleado='" + getApellidoEmpleado() + "'" +
            ", cargoEmpleado='" + getCargoEmpleado() + "'" +
            ", phone='" + getPhone() + "'" +
            "}";
    }
}
