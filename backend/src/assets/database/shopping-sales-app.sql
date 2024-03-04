-- Rol de usuario
CREATE ROLE puriihuaman LOGIN PASSWORD '1998pvri';

-- Tablespace donde se va a hubicar
CREATE TABLESPACE ts_shopping OWNER puriihuaman LOCATION E'C:\\workspace\\github\\shopping-sales-app\\src\\assets\\database';

-- Eliminar la tabla si existe
DROP DATABASE shopping_sales_app;

-- Creamos la tabla si no existe


SELECT 'CREATE DATABASE shopping_sales_app' WHERE NOT EXISTS (SELECT FROM puriihuaman WHERE datname = 'shopping_sales_app') OWNER = puriihuaman TABLESPACE = ts_shopping;


-- Usar la base de datos
USE shopping_sales_app;

-- Crear tabla perfil
CREATE TABLE IF NOT EXISTS profiles (
  id_profile UUID,
  profile VARCHAR(20) NOT NULL,
  CONSTRAINT pk_profiles PRIMARY KEY (id_profile),
  CONSTRAINT uk_profiles UNIQUE (profile)
);

-- Crear tabla usuarios
CREATE TABLE IF NOT EXISTS users (
  id_user UUID,
  name_user VARCHAR(40) NOT NULL,
  lastname VARCHAR(40) NOT NULL,
  email VARCHAR(60) NOT NULL,
  username VARCHAR(40) NOT NULL,
  password VARCHAR(60) NOT NULL,
  id_profile UUID,
  CONSTRAINT pk_users PRIMARY KEY (id_user),
  CONSTRAINT uk_users UNIQUE (username),
  CONSTRAINT fk_users_profiles FOREIGN KEY (id_profile) REFERENCES profiles (id_profile)
  ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Crear tabla de cliente
CREATE TABLE IF NOT EXISTS customers (
  id_customer UUID,
  id_document VARCHAR (20) NOT NULL,
  name VARCHAR(40) NOT NULL,
  address VARCHAR(200) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  CONSTRAINT pk_customers PRIMARY KEY (id_customer),
  CONSTRAINT uk_customers UNIQUE (id_document)
);

-- Crear tabla de proveedor
CREATE TABLE IF NOT EXISTS providers (
  code SMALLSERIAL,
  id_document VARCHAR (20) NOT NULL,
  name VARCHAR(40) NOT NULL,
  address VARCHAR(200) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  CONSTRAINT pk_providers PRIMARY KEY (code),
  CONSTRAINT uk_providers UNIQUE (id_document)
);

-- Crear tabla de producto
CREATE TABLE IF NOT EXISTS products (
  code SMALLSERIAL,
  name VARCHAR(40) NOT NULL,
  amount INT NOT NULL,
  price DECIMAL NOT NULL,
  code_user SMALLINT,
  CONSTRAINT pk_products PRIMARY KEY (code),
  CONSTRAINT fk_products_users FOREIGN KEY (code_user) REFERENCES users (code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT ck_amount CHECK (amount > 0),
  CONSTRAINT ck_price CHECK (price > 0)
);

-- Crear tabla de compra
CREATE TABLE IF NOT EXISTS shopping (
  code SMALLSERIAL,
  update_date DATE DEFAULT NOW() NOT NULL,
  code_provider SMALLINT,
  code_product SMALLINT,
  amount INT NOT NULL,
  purchase_value INT NOT NULL,
  code_user SMALLINT,
  CONSTRAINT pk_shopping PRIMARY KEY (code),
  CONSTRAINT fk_shopping_providers FOREIGN KEY (code_provider) REFERENCES providers (code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT fk_shopping_products FOREIGN KEY (code_product) REFERENCES products (code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT ck_shopping_amount CHECK(amount > 0),
  CONSTRAINT ck_shopping_purchase_value CHECK(purchase_value > 0),
  CONSTRAINT fk_shopping_users FOREIGN KEY (code_user) REFERENCES users (code) ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Crear tabla de venta
CREATE TABLE IF NOT EXISTS sales (
  code SMALLSERIAL,
  update_date DATE DEFAULT NOW() NOT NULL,
  code_customer SMALLINT,
  code_product SMALLINT,
  amount INT NOT NULL,
  sale_value INT NOT NULL,
  code_user SMALLINT,
  CONSTRAINT pk_sales PRIMARY KEY (code),
  CONSTRAINT fk_sales_customers FOREIGN KEY (code_customer) REFERENCES customers (code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT fk_sales_products FOREIGN KEY (code_product) REFERENCES products (code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT ck_sales_amount CHECK (amount > 0),
  CONSTRAINT ck_sales_sale_value CHECK (sale_value > 0),
  CONSTRAINT fk_sales_users FOREIGN KEY (code_user) REFERENCES users (code) ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Crear tabla de auditoria
CREATE TABLE IF NOT EXISTS audits (
  code SMALLSERIAL,
  audit_date TIMESTAMP DEFAULT NOW() NOT NULL,
  action VARCHAR(30) NOT NULL,
  table_name VARCHAR(30) NOT NULL,
  nuevo JSON,
  anterior JSON NOT NULL,
  code_user SMALLINT,
  CONSTRAINT pk_audits PRIMARY KEY (code),
  CONSTRAINT uk_audits UNIQUE (table_name),
  CONSTRAINT fk_audits_users FOREIGN KEY (code_user) REFERENCES users (code) ON UPDATE RESTRICT ON DELETE RESTRICT
);


-- + INSERCIÓN DE DATOS BÁSICOS

-- Perfiles
INSERT INTO profiles (profile)
VALUES ('ADMINISTRADOR'), ('CAJERO');

-- Consultar perfiles
SELECT * FROM profiles;

-- Usuarios
INSERT INTO users (name_user, lastname, email, username, password, code_profile)
VALUES 
('alexys', 'lozada', 'alexyslozada@gmail.com', 'alozada', MD5('alozada123'), 1),
('pedro', 'perez', 'pedroperez@gmail.com', 'pperez', MD5('pperez123'), 2);

-- Consultar usuarios
SELECT * FROM users;

-- Clientes
INSERT INTO customers (id_document, name, address, phone)
VALUES 
('12345678', 'COMPRATODO S.A.S', 'AV. PERU CDRA. PERUVIAN', '2114477'),
('87654321', 'GLORIA S.A.C', 'AV. MINERALES CDRA. 5', '8746366');

-- Consultar clientes
SELECT * FROM customers;

-- Proveedores
INSERT INTO providers (id_document, name, address, phone)
VALUES 
('12345678', 'MOLITALIA S.A.C', 'AV. PANAMERICANA CDRA. 20', '8762526'),
('87654321', 'PROVETODO LTDA', 'CDRA. 1 #2 #3', '4729832');

-- Consultar proveedores
SELECT * FROM providers;

-- Productos
INSERT INTO products (name, amount, price, code_user)
VALUES 
('NEVERA', 5, 12000, 1),
('LAVADORA', 1, 8900, 2),
('SECADORA', 3, 7400, 1),
('CALENTADOR', 1, 3200, 2);

-- Consultar productos
SELECT * FROM products;

-- + CREACIÓN DE FUNCIONES BÁSICAS

-- Función de consultar de clientes
CREATE OR REPLACE FUNCTION consult_customers()
RETURNS SETOF customers AS
$BODY$
BEGIN
  RETURN QUERY SELECT code, id_document, name, address, phone FROM customers ORDER BY name;
END;
$BODY$
LANGUAGE plpgsql;

-- Alterar la función
ALTER FUNCTION consult_customers() OWNER TO puriihuaman;

-- Función de consultar productos
CREATE OR REPLACE FUNCTION consult_products()
RETURNS SETOF products AS
$BODY$
BEGIN
RETURN QUERY SELECT code, name, amount, price, code_user 
FROM products
ORDER BY name;
END;
$BODY$
LANGUAGE plpgsql;

-- Alterar función
ALTER FUNCTION consult_products() OWNER TO puriihuaman;

-- + FUNCIÓN DE AUTENTICACIÓN

CREATE OR REPLACE FUNCTION autentication(_user CHARACTER VARYING, _password CHARACTER VARYING)
RETURNS TABLE (code_user SMALLINT, name_user CHARACTER VARYING, code_profile SMALLINT, profile CHARACTER VARYING) AS
$BODY$
BEGIN
RETURN QUERY SELECT us.code, us.name_user, prof.code, prof.profile
FROM users AS us NATURAL JOIN profiles AS prof
WHERE us.username = _user AND us.password = MD5(_password);
IF NOT FOUND THEN
RAISE EXCEPTION 'El usuario o la constraseña no coinciden';
END IF;
END;
$BODY$
LANGUAGE plpgsql;

-- Llamado de la función desde un BACKEND
SELECT code_user, name_user, code_profile, profile 
FROM autentication('alozada', 'alozada123');
SELECT code_user, name_user, code_profile, profile 
FROM autentication('pperez', 'pperez123');

-- + FUNCIÓN TRIGGER PARA AUDITORÍA DE PRODUCTOS
CREATE OR REPLACE FUNCTION tg_products_audits()
RETURNS TRIGGER AS
$BODY$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO audits (code_user, action, table_name, anterior, nuevo)
    SELECT NEW.code_user, 'UPDATE', 'PRODUCTS', ROW_TO_JSON(OLD.*), ROW_TO_JSON(NEW.*);
  END IF;
  RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;

-- + TRIGGER AUDITORÍA PRODUCTOS
CREATE TRIGGER tg_products_audits
AFTER UPDATE ON products
FOR EACH ROW EXECUTE PROCEDURE tg_products_audits();

-- + FUNCIÓN TRIGGER PARA AUDITORÍA DE COMPRAS
CREATE OR REPLACE FUNCTION tg_shopping_audits()
RETURNS TRIGGER AS
$BODY$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audits (code_user, action, table_name, anterior, nuevo)
    SELECT NEW.code_user, 'INSERT', 'SHOPPING', ROW_TO_JSON(NEW.*), NULL;
  END IF;
  RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;

-- + TRIGGER AUDITORÍA COMPRAS
CREATE TRIGGER tg_shopping_audits
AFTER INSERT ON shopping
FOR EACH ROW EXECUTE PROCEDURE tg_shopping_audits();


-- + FUNCIÓN DE COMPRAR (buy)
CREATE OR REPLACE FUNCTION buy(
  _provider SMALLINT,
  _product SMALLINT,
  _amount SMALLINT,
  _purchase_value SMALLINT,
  _user SMALLINT
) RETURNS SMALLINT AS
$BODY$
DECLARE
  _idinvoice SMALLINT; -- idfactura
BEGIN
  -- SE INSERTA EL REGISTRO DE COMPRAS
  INSERT INTO shopping (code_provider, code_product, amount, purchase_value, code_user)
  VALUES (_provider, _product, _amount, _purchase_value, _user) RETURNING code INTO _idinvoice;
  IF FOUND THEN
    -- SE ACTUALIZA EL STOCK DEL PRODUCTO
    UPDATE products
    SET amount = amount + _amount, price = _purchase_value, code_user = _user
    WHERE code = _product;
  ELSE
    RAISE EXCEPTION 'No fue posible insertar el registro de compras';
  END IF;
  RETURN _idinvoice;
END;
$BODY$
LANGUAGE plpgsql;

-- + FUNCIÓN TRIGGER PARA AUDITORÍA DE VENTAS
CREATE OR REPLACE FUNCTION tg_sales_audits()
RETURNS TRIGGER AS
$BODY$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audits (code_user, action, table_name, anterior, nuevo)
    SELECT NEW.code_user, 'INSERT', 'SALES', ROW_TO_JSON(NEW.*), NULL;
  END IF;
  RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;

-- TRIGGER DE AUDITORÍA DE VENTAS
CREATE TRIGGER tg_sales_audits
AFTER INSERT ON sales
FOR EACH ROW EXECUTE PROCEDURE tg_sales_audits();

-- + FUNCIÓN DE VENDER (SELL)
CREATE OR REPLACE FUNCTION shell (
  _customer SMALLINT,
  _product SMALLINT,
  _amount SMALLINT,
  _user SMALLINT
) RETURNS SMALLINT AS
$BODY$
DECLARE
  _sale_value SMALLINT; -- valor de venta
  _stock SMALLINT; -- existencia
  _idinvoice SMALLINT; -- idfactura
BEGIN
  -- se busca el precio de venta y se valida si hay stock de ventas
  SELECT CAST(price * 1.3 AS SMALLINT), amount
  INTO STRICT _sale_value, _stock
  FROM products WHERE code = _product;
  -- Si hay suficiente stock, se vende
  IF _stock >= _amount THEN
    -- se inserta el registro de ventas
    INSERT INTO sales (code_customer, code_product, amount, sale_value, code_user)
    VALUES (_customer, _product, _amount, _sale_value, _user) RETURNING code INTO _idinvoice;
    IF FOUND THEN
      -- se actualiza el stock del producto
      UPDATE products
      SET amount = amount - _amount, code_user = _user
      WHERE code = _product;
    ELSE
      RAISE EXCEPTION 'No fue posible insertar el registro de ventas';
    END IF;
  ELSE
    RAISE EXCEPTION 'No existe suficiente cantidad para la venta %', _stock;
  END IF;
  RETURN _idinvoice;

  EXCEPTION WHEN NO_DATA_FOUND THEN 
    RAISE EXCEPTION 'No se encontró el producto a vender';
END;
$BODY$
LANGUAGE plpgsql;

-- + FUNCIONES DE CONSULTA

-- Consultar ventas
CREATE OR REPLACE FUNCTION consult_sales (
  _limit SMALLINT,
  _page SMALLINT
)
RETURNS TABLE (code SMALLINT, update_date DATE, customer CHARACTER VARYING, product CHARACTER VARYING, amount SMALLINT, sale_value SMALLINT)
AS
$BODY$
DECLARE
  _star SMALLINT;
BEGIN
  _star = _limit * _page - _limit;

  RETURN QUERY SELECT s.code, s.update_date, c.name AS customer,
  p.name AS product, s.amount, s.sale_value
  FROM sales AS s INNER JOIN customers AS c
  ON s.code_customer = c.code
  INNER JOIN products as p
  ON s.code_product = p.code
  LIMIT _limit
  OFFSET _star;
END;
$BODY$
LANGUAGE plpgsql;

-- Consultar compras
CREATE OR REPLACE FUNCTION consult_shopping (
  _limit SMALLINT,
  _page SMALLINT
)
RETURNS TABLE (code SMALLINT, update_date DATE, provider CHARACTER VARYING, product CHARACTER VARYING, amount SMALLINT, purchase_value SMALLINT)
AS
$BODY$
DECLARE
  _star SMALLINT;
BEGIN
  _star = _limit * _page - _limit;
  RETURN QUERY SELECT shop.code, shop.update_date, p.name AS provider, prod.name AS product, shop.amount, shop.purchase_value
  FROM shopping AS shop INNER JOIN providers p
    ON shop.code_provider = p.code
    INNER JOIN products AS prod
    ON shop.code_product = prod.code
  LIMIT _limit
  OFFSET _star;
END;
$BODY$
LANGUAGE plpgsql;

-- Consulta inventario actual
CREATE OR REPLACE FUNCTION consult_inventories(_limit SMALLINT, _page SMALLINT)
RETURNS SETOF products AS
$BODY$
DECLARE
  _star SMALLINT;
BEGIN
  _star = _limit * _page - _limit;
  RETURN QUERY SELECT code, name, amount, price, code_user
  FROM products
  ORDER BY code
  LIMIT _limit
  OFFSET _star;
END;
$BODY$
LANGUAGE plpgsql;

-- + PRUEBA DE LAS FUNCIONES
SELECT * FROM sales;
SELECT * FROM shopping;
SELECT * FROM products;
SELECT * FROM audits;

SELECT buy(2::SMALLINT, 2::SMALLINT, 1::SMALLINT, 13500::SMALLINT,2::SMALLINT);

SELECT shell(1::SMALLINT, 1::SMALLINT, 45::SMALLINT, 1::SMALLINT);