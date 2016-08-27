/**
 * 
 */
package com.example.domain;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

/**
 * @author krishg
 *
 */
@MappedSuperclass
public class AbstractBaseEntity {

	private Long oid;

	private String createdBy;

	private Date createdAt;

	@GenericGenerator(name = "optimized-sequence", strategy = "com.example.CustomSequenceStyleGenerator", parameters = {
			@Parameter(name = "prefer_sequence_per_entity", value = "true"),
			@Parameter(name = "optimizer", value = "hilo"), @Parameter(name = "increment_size", value = "1") })
	@Id
	@GeneratedValue(generator = "optimized-sequence")
	public Long getOid() {
		return oid;
	}

	public void setOid(Long id) {
		this.oid = id;
	}

	public String getCreatedBy() {
		return "gkp";
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedAt() {
		return new Date();
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

}
