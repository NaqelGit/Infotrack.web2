import React from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import './single-card.scss';
import ResponsiveBox, { Row, Col,Item,Location } from 'devextreme-react/responsive-box';

export  function SingleCard({ title, description, children }) {
  return (
    <ScrollView height={'100%'} width={'100%'} className={'with-footer single-card'}>
     
 
      <div className={'dx-card content'}>
        <div className={'header'}>
          <div className={'title'}>{title}</div>
          <div className={'description'}>{description}</div>
        </div>
        {children}
      </div>
      
    </ScrollView>
)}

export  function SingleCardLogin({ title, description, children }) {
  return (
    <ScrollView height={'100%'} width={'100%'}  className={'with-footer single-card login-bg bgg-img bg-blueclr'}>
      <ResponsiveBox>
                <Row ratio={1}/>
                <Row ratio={2}/>
                <Row ratio={1}/>
               
                <Col ratio={1} screen="md lg"/>
                <Col ratio={4}/>
                <Col ratio={1} screen="md lg"/>

              
                <Item>
                    <Location screen="md lg" row={1} col={1}/>
                    <Location screen="xs sm" row={1} col={0}/>
                    <div className="content item">
                    <div className="content item" style={{marginTop:10+'em'}}>
                          <div className={'dx-card content'}>
                          <div className={'header'}>
                            <div className={'title'}>{title}</div>
                            <div className={'description'}>{description}</div>
                          </div>
                          {children}
                        </div>
                    </div>
  
                    </div>
                </Item>
 
              
 
               
               
      </ResponsiveBox>
    </ScrollView>
)}

export default { SingleCard, SingleCardLogin };