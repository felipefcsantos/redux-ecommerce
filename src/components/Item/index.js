import styles from './Item.module.scss'
import { AiOutlineHeart, AiFillHeart, AiFillMinusCircle, AiFillPlusCircle, AiOutlineCheck, AiFillEdit, AiFillCloseCircle } from 'react-icons/ai'
import { FaCartPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { deletarItem, mudarFavorito, mudarItem } from 'store/reducers/itens'
import { mudarCarrinho, mudarQuantidade } from 'store/reducers/carrinho'
import classNames from 'classnames'
import { useState } from 'react'
import Input from 'components/Input'

export default function Item(props) {
    const iconeProps = {
        color: '#041833',
        size: 24
    }
    const quantidadeProps = {
        color: '#1875E8',
        size: 32
    }
    const {
        titulo,
        preco,
        foto,
        descricao,
        favorito,
        id,
        carrinho,
        quantidade
    } = props
    const [modoEdicao, setModoEdicao] = useState(false)
    const [novoTitulo, setNovoTitulo] = useState(titulo)
    const dispach = useDispatch()
    const estaNoCarrinho = useSelector(state => state.carrinho.some(itemNoCarrinho => itemNoCarrinho.id === id))

    function resolverFavorito() {
        dispach(mudarFavorito(id))
    }
    function resolverCarrinho() {
        dispach(mudarCarrinho(id))
    }

    const componenteModoEdicao = <>
        {modoEdicao
            ? <AiOutlineCheck
                {...iconeProps}
                className={styles['item-acao']}
                onClick={() => {
                    setModoEdicao(false)
                    dispach(mudarItem({
                        id, 
                        item: {titulo: novoTitulo}
                    }))
                }}
            />
            : <AiFillEdit
                {...iconeProps}
                className={styles['item-acao']}
                onClick={() => setModoEdicao(true)}
            />
        }
    </>

    return (
        <div className={classNames(styles.item, {
            [styles.itemNoCarrinho]: carrinho
        })}>
            <AiFillCloseCircle {...iconeProps} className={`${styles['item-acao']} ${styles['item-deletar']}`} onClick={() => dispach(deletarItem(id))}/>
            <div className={styles['item-imagem']}>
                <img src={foto} alt={titulo} />
            </div>
            <div className={styles['item-descricao']}>
                <div className={styles['item-titulo']}>
                    {modoEdicao
                        ?<Input 
                            value={novoTitulo} 
                            onChange={event => setNovoTitulo(event.target.value)}
                        />
                        :<h2>{titulo}</h2>
                    }
                    <p>{descricao}</p>
                </div>
                <div className={styles['item-info']}>
                    <div className={styles['item-preco']}>
                        R$ {preco.toFixed(2)}
                    </div>
                    <div className={styles['item-acoes']}>
                        {favorito
                            ? <AiFillHeart {...iconeProps} color='#ff0000' className={styles['item-acao']} onClick={resolverFavorito} />
                            : <AiOutlineHeart {...iconeProps} onClick={resolverFavorito} />
                        }
                        {carrinho
                            ? (
                                <div className={styles.quantidade}>
                                    Quantidade:
                                    <AiFillMinusCircle
                                        {...quantidadeProps}
                                        onClick={() => {
                                            if (quantidade >= 1) {
                                                dispach(mudarQuantidade({ id, quantidade: -1 }))
                                            }
                                        }}
                                    />
                                    <span>{String(quantidade || 0).padStart(2, '0')}</span>
                                    <AiFillPlusCircle
                                        {...quantidadeProps}
                                        onClick={() => dispach(mudarQuantidade({ id, quantidade: +1 }))}
                                    />
                                </div>
                            )
                            : (
                                <>
                                    <FaCartPlus
                                        {...iconeProps}
                                        color={estaNoCarrinho ? '#1875E8' : iconeProps.color}
                                        className={styles['item-acao']}
                                        onClick={resolverCarrinho}
                                    />
                                    {componenteModoEdicao}
                                </>
                            )

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
