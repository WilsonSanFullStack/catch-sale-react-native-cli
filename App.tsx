/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Alert} from 'react-native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Clipboard,
} from 'react-native';

interface Producto {
  codigo: number;
  precio: number;
  cantidad: number;
  subTotal: number;
}

function App(): React.JSX.Element {
  const [codigo, SetCodigo] = useState<string>('');
  const [precio, SetPrecio] = useState<string>('');
  const [cantidad, SetCantidad] = useState<string>('');
  const [factura, setFactura] = useState<Producto[]>([]);

  const handleFactura = () => {
    if (codigo && precio && cantidad) {
      const newProducto = {
        codigo: parseInt(codigo),
        precio: parseInt(precio),
        cantidad: parseInt(cantidad),
        subTotal: parseInt(precio) * parseInt(cantidad),
      };
      setFactura([...factura, newProducto]);
      SetCodigo('');
      SetCantidad('');
      SetPrecio('');
    } else {
      Alert.alert('Faltan datos',
      'Por favor completa la información antes de agregar el producto.',);
    }
  };
  const handleDelete = (productId: number) => {
    const updatedFactura = factura.filter(
      producto => producto.codigo !== productId,
    );
    setFactura(updatedFactura);
  };
  const [cliente, setCliente] = useState<string>('');
  const [vendedor, setVendedor] = useState<string>('');

  let total = 0;
  for (const x of factura) {
    total += x.subTotal;
  }

  const copyFacturaToClipboard = () => {
    if (!cliente || !vendedor || factura.length === 0) {
      Alert.alert(
        'Faltan datos',
        'Por favor completa la información antes de copiar la factura al portapapeles.',
      );
      return;
    }

    const formatFactura = () => {
      const formattedFactura = `Cliente: ${cliente},\nVendedor: ${vendedor},\n\n${factura
        .map(
          producto =>`Producto: ${producto.codigo}, precio: ${producto.precio},  cantidad: ${producto.cantidad},  subTotal: ${producto.subTotal}, `,).join('\n\n')}\n\ntotal: ${total}`;
      return formattedFactura;
    };

    const formattedFactura = formatFactura();
    Clipboard.setString(formattedFactura);
    Alert.alert('Factura copiada', 'La factura se ha copiado al portapapeles.');
    setFactura([])
    setCliente('')
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar /> */}
      <Text style={styles.text}>Catch Sale</Text>
      <View style={{justifyContent: 'space-between'}}>
        <Text style={styles.producto}>Producto</Text>
        <View style={styles.view}>
          <Text style={styles.label}>Codigo:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="codico del articulo"
            style={styles.input}
            value={codigo}
            onChangeText={text => SetCodigo(text)}
          />
        </View>

        <View style={styles.view}>
          <Text style={styles.label}>Precio:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="precio del articulo"
            style={styles.input}
            value={precio}
            onChangeText={text => SetPrecio(text)}
          />
        </View>
        <View style={styles.view}>
          <Text style={styles.label}>Cantidad:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="cantidad del articulo"
            style={styles.input}
            value={cantidad}
            onChangeText={text => SetCantidad(text)}
          />
        </View>
      </View>
      <View>
        <Button title="agregar" onPress={handleFactura}></Button>
      </View>
      <View style={styles.stickyHeader}>
        <Text style={styles.encabezado}>##</Text>
        <Text style={styles.encabezado}>codigo</Text>
        <Text style={styles.encabezado}>precio</Text>
        <Text style={styles.encabezado}>cantidad</Text>
        <Text style={styles.encabezado}>subTotal</Text>
        <Text style={styles.encabezado}>eliminar</Text>
      </View>
      <ScrollView
        style={{
          borderColor: 'white',
          borderWidth: 2,
          width: '99%',
          marginLeft: 2,
        }}>
        {factura?.map((producto, index) => {
          return (
            <View style={styles.table} key={index + 1}>
              <Text style={styles.fila}>{index + 1}</Text>
              <Text style={styles.fila}>{producto.codigo}</Text>
              <Text style={styles.fila}>
                {producto.precio.toLocaleString('es-ES', {
                  maximumFractionDigits: 2,
                })}
              </Text>
              <Text style={styles.fila}>
                {producto.cantidad.toLocaleString('es-ES', {
                  maximumFractionDigits: 2,
                })}
              </Text>
              <Text style={styles.fila}>
                {producto.subTotal.toLocaleString('es-ES', {
                  maximumFractionDigits: 2,
                })}
              </Text>
              <View>
                <Button
                  title="eliminar"
                  onPress={() => handleDelete(producto.codigo)}></Button>
              </View>
            </View>
          );
        })}
        <View style={styles.table}>
          <Text style={styles.fila}></Text>
          <Text style={styles.fila}></Text>
          <Text style={styles.fila}></Text>
          <Text style={styles.fila}></Text>
          <Text style={styles.fila}>Total:</Text>
          <Text style={styles.fila}>
            {total.toLocaleString('es-ES', {
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </ScrollView>
      <View style={{marginTop: 10}}>
        <View style={styles.view}>
          <Text style={styles.label}>Cliente:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="codico del cliente"
            style={styles.input}
            value={cliente}
            onChangeText={text => setCliente(text)}
          />
        </View>
        <View style={styles.view}>
          <Text style={styles.label}>Vendedor:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="codico del vendedor"
            style={styles.input}
            value={vendedor}
            onChangeText={text => setVendedor(text)}
          />
        </View>
      </View>
      <View>
        <Button title="Guardar" onPress={copyFacturaToClipboard}></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  text: {
    fontSize: 20,
    margin: 20,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  producto: {
    fontSize: 15,
    margin: 15,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    // backgroundColor: 'red'
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    margin: 10,
    marginRight: 5,
    textAlign: 'center',
    width: '25%',
  },
  input: {
    height: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 5,
    color: 'black',
    width: '80%',
    backgroundColor: 'lightgray',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  stickyHeader: {
    marginTop: 10,
    backgroundColor: 'gray', // Adjust background color as needed
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    position: 'relative', // Make headers stick to the top
    top: 0, // Set top position to 0 for proper placement
    zIndex: 100, // Ensure headers stay on top during scrolling
    width: '98%',
  },
  table: {
    flexDirection: 'row',
    margin: 2,
    paddingLeft: 7,
    width: '98%',
    marginLeft: 4,
    color: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'black',
    borderWidth: 2,
  },
  encabezado: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: 4,
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  fila: {
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingRight: 4
  },
});

export default App;
