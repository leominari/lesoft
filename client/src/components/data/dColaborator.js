import React from 'react'

export function Colaborator(){


    function getName(id){
        colaboradores.forEach(element => {
            if(element.id === id)
                return element.name
        });
    }

    function getType(id){
        colaboradores.forEach(element => {
            if(element.id === id)
                return element.type
        });
    }
    
}