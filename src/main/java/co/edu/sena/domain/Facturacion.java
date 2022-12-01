package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Facturacion.
 */
@Entity
@Table(name = "facturacion")
public class Facturacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "fecha_factura", nullable = false)
    private LocalDate fechaFactura;

    @NotNull
    @Column(name = "valor_factura", nullable = false)
    private Float valorFactura;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "vehiculos", "facturacions" }, allowSetters = true)
    private Registro registro;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "facturacions" }, allowSetters = true)
    private Cliente cliente;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "facturacions" }, allowSetters = true)
    private Visitante visitante;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "facturacions" }, allowSetters = true)
    private Empleado empleado;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "facturacions" }, allowSetters = true)
    private FormaDePago formaDePago;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Facturacion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaFactura() {
        return this.fechaFactura;
    }

    public Facturacion fechaFactura(LocalDate fechaFactura) {
        this.setFechaFactura(fechaFactura);
        return this;
    }

    public void setFechaFactura(LocalDate fechaFactura) {
        this.fechaFactura = fechaFactura;
    }

    public Float getValorFactura() {
        return this.valorFactura;
    }

    public Facturacion valorFactura(Float valorFactura) {
        this.setValorFactura(valorFactura);
        return this;
    }

    public void setValorFactura(Float valorFactura) {
        this.valorFactura = valorFactura;
    }

    public Registro getRegistro() {
        return this.registro;
    }

    public void setRegistro(Registro registro) {
        this.registro = registro;
    }

    public Facturacion registro(Registro registro) {
        this.setRegistro(registro);
        return this;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Facturacion cliente(Cliente cliente) {
        this.setCliente(cliente);
        return this;
    }

    public Visitante getVisitante() {
        return this.visitante;
    }

    public void setVisitante(Visitante visitante) {
        this.visitante = visitante;
    }

    public Facturacion visitante(Visitante visitante) {
        this.setVisitante(visitante);
        return this;
    }

    public Empleado getEmpleado() {
        return this.empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public Facturacion empleado(Empleado empleado) {
        this.setEmpleado(empleado);
        return this;
    }

    public FormaDePago getFormaDePago() {
        return this.formaDePago;
    }

    public void setFormaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
    }

    public Facturacion formaDePago(FormaDePago formaDePago) {
        this.setFormaDePago(formaDePago);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Facturacion)) {
            return false;
        }
        return id != null && id.equals(((Facturacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Facturacion{" +
            "id=" + getId() +
            ", fechaFactura='" + getFechaFactura() + "'" +
            ", valorFactura=" + getValorFactura() +
            "}";
    }
}
