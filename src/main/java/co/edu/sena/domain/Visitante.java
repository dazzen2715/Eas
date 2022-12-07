package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Visitante.
 */
@Entity
@Table(name = "visitante")
public class Visitante implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 25)
    @Column(name = "nombrevisitante", length = 25, nullable = false)
    private String nombrevisitante;

    @Size(max = 25)
    @Column(name = "apellido", length = 25)
    private String apellido;

    @NotNull
    @Size(max = 25)
    @Column(name = "phone", length = 25, nullable = false, unique = true)
    private String phone;

    @OneToMany(mappedBy = "visitante")
    @JsonIgnoreProperties(value = { "registro", "cliente", "visitante", "empleado", "formaDePago" }, allowSetters = true)
    private Set<Facturacion> facturacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Visitante id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombrevisitante() {
        return this.nombrevisitante;
    }

    public Visitante nombrevisitante(String nombrevisitante) {
        this.setNombrevisitante(nombrevisitante);
        return this;
    }

    public void setNombrevisitante(String nombrevisitante) {
        this.nombrevisitante = nombrevisitante;
    }

    public String getApellido() {
        return this.apellido;
    }

    public Visitante apellido(String apellido) {
        this.setApellido(apellido);
        return this;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getPhone() {
        return this.phone;
    }

    public Visitante phone(String phone) {
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
            this.facturacions.forEach(i -> i.setVisitante(null));
        }
        if (facturacions != null) {
            facturacions.forEach(i -> i.setVisitante(this));
        }
        this.facturacions = facturacions;
    }

    public Visitante facturacions(Set<Facturacion> facturacions) {
        this.setFacturacions(facturacions);
        return this;
    }

    public Visitante addFacturacion(Facturacion facturacion) {
        this.facturacions.add(facturacion);
        facturacion.setVisitante(this);
        return this;
    }

    public Visitante removeFacturacion(Facturacion facturacion) {
        this.facturacions.remove(facturacion);
        facturacion.setVisitante(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Visitante)) {
            return false;
        }
        return id != null && id.equals(((Visitante) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Visitante{" +
            "id=" + getId() +
            ", nombrevisitante='" + getNombrevisitante() + "'" +
            ", apellido='" + getApellido() + "'" +
            ", phone='" + getPhone() + "'" +
            "}";
    }
}
