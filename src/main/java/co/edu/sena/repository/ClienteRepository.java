package co.edu.sena.repository;

import co.edu.sena.domain.Cliente;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Cliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByPhone(String phone);
    Optional<Cliente> findByCorreoCliente(String correo);
}
