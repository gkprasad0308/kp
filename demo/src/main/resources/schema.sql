CREATE TABLE TTX_TENANT
(
	OID						NUMBER(10,0)	NOT NULL,
	NAME				    VARCHAR2(80)    NOT NULL,
	DESCRIPTION				VARCHAR2(255)	NOT NULL,
	CREATED_AT 				TIMESTAMP 		NOT NULL, 
	CREATED_BY 				VARCHAR2(50 )	NOT NULL,
	CONSTRAINT TTX_TENANT_PK PRIMARY KEY (OID)
);

CREATE SEQUENCE TTX_TENANT_SEQ
MINVALUE 1 MAXVALUE 9999
START WITH 1 INCREMENT BY 1;

CREATE TABLE TTX_ORGANIZATION_UNIT
(
	OID								NUMBER(10,0)		NOT NULL,
	NAME 							VARCHAR2(50) 		NOT NULL,
	DESCRIPTION 					VARCHAR2(255 ) 		NOT NULL,
	CREATED_AT 						TIMESTAMP 			NOT NULL, 
	CREATED_BY 						VARCHAR2(50 )		NOT NULL,
	TENANT_OID						NUMBER(10,0)		NOT NULL,
    CONSTRAINT TTX_ORG_UNIT_PK PRIMARY KEY (OID)     
);

CREATE SEQUENCE TTX_ORGANIZATION_UNIT_SEQ
MINVALUE 1 MAXVALUE 9999
START WITH 1 INCREMENT BY 1;

ALTER TABLE TTX_ORGANIZATION_UNIT 
ADD CONSTRAINT TTX_ORG_UNIT_TEN_FK FOREIGN KEY (TENANT_OID)
    REFERENCES TTX_TENANT (OID);

CREATE TABLE TTX_ROLE 
(
	OID 					NUMBER(10,0) 			NOT NULL, 
	NAME 					VARCHAR2(50 ) 			NOT NULL, 
	DESCRIPTION 			VARCHAR2(255 ) 			NOT NULL,
	CREATED_AT 				TIMESTAMP  				NOT NULL, 
	CREATED_BY 				VARCHAR2(50 ) 			NOT NULL,
	TENANT_OID 				NUMBER(10,0) 			NOT NULL,
	CONSTRAINT TTX_ROLE_PK PRIMARY KEY (OID)
)  ;

CREATE SEQUENCE TTX_ROLE_SEQ
MINVALUE 1 MAXVALUE 9999
START WITH 1 INCREMENT BY 1;

ALTER TABLE TTX_ROLE 
ADD CONSTRAINT TTX_ROLE_FK FOREIGN KEY (TENANT_OID)
REFERENCES TTX_TENANT (OID);

CREATE TABLE TTX_ORG_UNIT_ROLE_X
(
	ORG_UNITS_OID			NUMBER(10,0)	NOT NULL,
	ROLES_OID				NUMBER(10,0)	NOT NULL,
	CONSTRAINT TTX_ORG_UNIT_ROLE_X_PK PRIMARY KEY (ORG_UNITS_OID, ROLES_OID)
);


ALTER TABLE TTX_ORG_UNIT_ROLE_X
	ADD CONSTRAINT TTX_OU_ROLE_FK1 FOREIGN KEY (ORG_UNITS_OID)
	REFERENCES TTX_ORGANIZATION_UNIT (OID);

ALTER TABLE TTX_ORG_UNIT_ROLE_X
	ADD CONSTRAINT TTX_OU_ROLE_FK2 FOREIGN KEY (ROLES_OID)
	REFERENCES TTX_ROLE (OID);

CREATE TABLE TTX_EMP
(
	OID						NUMBER(10,0)	NOT NULL,
	NAME				    VARCHAR2(80)    NOT NULL,
	CREATED_AT 				TIMESTAMP 		NOT NULL, 
	CREATED_BY 				VARCHAR2(50 )	NOT NULL,
	CONSTRAINT TTX_EMP_PK PRIMARY KEY (OID)
);

CREATE SEQUENCE TTX_EMP_SEQ
MINVALUE 1 MAXVALUE 9999
START WITH 1 INCREMENT BY 1;
