package co.edu.sena.repository;

import co.edu.sena.domain.TipoVehiculo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TipoVehiculo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoVehiculoRepository extends JpaRepository<TipoVehiculo, Long> {}
