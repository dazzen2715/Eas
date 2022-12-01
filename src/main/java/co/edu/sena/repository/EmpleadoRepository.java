package co.edu.sena.repository;

import co.edu.sena.domain.Empleado;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Empleado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    Optional<Empleado> findByNombreEmpleado(String nombre);
    Optional<Empleado> findByApellidoEmpleado(String apellidoEmpleado);
    Optional<Empleado> findByPhone(String phone);
    Optional<Empleado> findByCargoEmpleado(String cargo);
}
