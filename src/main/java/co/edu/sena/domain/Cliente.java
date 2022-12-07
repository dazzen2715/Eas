package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 25)
    @Column(name = "nombre_cliente", length = 25, nullable = false)
    private String nombreCliente;

    @NotNull
    @Size(max = 25)
    @Column(name = "apellidocliente", length = 25, nullable = false)
    private String apellidocliente;

    @NotNull
    @Size(max = 25)
    @Column(name = "bloque_cliente", length = 25, nullable = false)
    private String bloqueCliente;

    @NotNull
    @Size(max = 25)
    @Column(name = "phone", length = 25, nullable = false, unique = true)
    private String phone;

    @NotNull
    @Size(max = 25)
    @Column(name = "correo_cliente", length = 25, nullable = false, unique = true)
    private String correoCliente;

    @OneToMany(mappedBy = "cliente")
    @JsonIgnoreProperties(value = { "registro", "cliente", "visitante", "empleado", "formaDePago" }, allowSetters = true)
    private Set<Facturacion> facturacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Cliente id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreCliente() {
        return this.nombreCliente;
    }

    public Cliente nombreCliente(String nombreCliente) {
        this.setNombreCliente(nombreCliente);
        return this;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getApellidocliente() {
        return this.apellidocliente;
    }

    public Cliente apellidocliente(String apellidocliente) {
        this.setApellidocliente(apellidocliente);
        return this;
    }

    public void setApellidocliente(String apellidocliente) {
        this.apellidocliente = apellidocliente;
    }

    public String getBloqueCliente() {
        return this.bloqueCliente;
    }

    public Cliente bloqueCliente(String bloqueCliente) {
        this.setBloqueCliente(bloqueCliente);
        return this;
    }

    public void setBloqueCliente(String bloqueCliente) {
        this.bloqueCliente = bloqueCliente;
    }

    public String getPhone() {
        return this.phone;
    }

    public Cliente phone(String phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCorreoCliente() {
        return this.correoCliente;
    }

    public Cliente correoCliente(String correoCliente) {
        this.setCorreoCliente(correoCliente);
        return this;
    }

    public void setCorreoCliente(String correoCliente) {
        this.correoCliente = correoCliente;
    }

    public Set<Facturacion> getFacturacions() {
        return this.facturacions;
    }

    public void setFacturacions(Set<Facturacion> facturacions) {
        if (this.facturacions != null) {
            this.facturacions.forEach(i -> i.setCliente(null));
        }
        if (facturacions != null) {
            facturacions.forEach(i -> i.setCliente(this));
        }
        this.facturacions = facturacions;
    }

    public Cliente facturacions(Set<Facturacion> facturacions) {
        this.setFacturacions(facturacions);
        return this;
    }

    public Cliente addFacturacion(Facturacion facturacion) {
        this.facturacions.add(facturacion);
        facturacion.setCliente(this);
        return this;
    }

    public Cliente removeFacturacion(Facturacion facturacion) {
        this.facturacions.remove(facturacion);
        facturacion.setCliente(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cliente)) {
            return false;
        }
        return id != null && id.equals(((Cliente) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", nombreCliente='" + getNombreCliente() + "'" +
            ", apellidocliente='" + getApellidocliente() + "'" +
            ", bloqueCliente='" + getBloqueCliente() + "'" +
            ", phone='" + getPhone() + "'" +
            ", correoCliente='" + getCorreoCliente() + "'" +
            "}";
    }
}
