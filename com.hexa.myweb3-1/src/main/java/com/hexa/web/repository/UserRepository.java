package com.hexa.web.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.hexa.web.entity.BankUser;

@Repository
public interface UserRepository extends CrudRepository<BankUser , Integer> {

}
