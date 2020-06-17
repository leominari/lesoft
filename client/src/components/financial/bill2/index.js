import React from 'react'
import { Calendar, Badge, Row } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import moment from 'moment'
import Modal2Pay from './Modal2Pay'
import Modal2Receive from './Modal2Receive'

moment.updateLocale('pt', {
  weekdaysMin : ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
});

export default function Bill2() {

    function getListData(value) {
        let listData;
        // console.log(value)
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'error', content: 'Isso é uma conta a pagar' },
                ];
                break;
            case 10:
                listData = [
                    { type: 'success', content: 'Isso é uma conta a receber' },
                ];
                break;
            case 15:
                listData = [
                    { type: 'processing', content: 'isso é um lembrete' },
                ];
                break;
            default:
        }
        return listData || [];
    }

    function dateCellRender(value) {
        const listData = getListData(value);

        return (
            <div className="space-top10">
                {listData.map(item => (
                    <Badge key={item.content} style={{ backgroundColor: '#52c41a'}} count={5}>
                        <a href="#" className="head-example" />
                    </Badge>
                ))}
            </div>
        );
    }

    function getMonthData(value) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }



    return <>
        <Row>
            <Modal2Receive />
            <Modal2Pay />
        </Row>
        <Calendar locale={ptBR} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    </>
}
