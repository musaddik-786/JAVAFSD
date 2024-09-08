package Dao;

import model.Product;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import conne.Connect;

public class ProductDaoImpl implements ProductDao {

    private SessionFactory sessionFactory;

    public ProductDaoImpl() {
        sessionFactory = Connect.getSessionFactory();
    }

    @Override
    public boolean addItem(Product product) {
        Transaction tx = null;
        try (Session session = sessionFactory.openSession()) {
            tx = session.beginTransaction();
            session.save(product);
            tx.commit();
            return true;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean removeItem(int pid) {
        Transaction tx = null;
        try (Session session = sessionFactory.openSession()) {
            tx = session.beginTransaction();
            Product product = session.get(Product.class, pid);
            if (product != null) {
                session.delete(product);
                tx.commit();
                return true;
            }
            return false;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean updatePrice(int pid, double newPrice) {
        Transaction tx = null;
        try (Session session = sessionFactory.openSession()) {
            tx = session.beginTransaction();
            String hql = "UPDATE Product SET price = :price WHERE pid = :pid";
            Query<?> query = session.createQuery(hql);
            query.setParameter("price", newPrice);
            query.setParameter("pid", pid);
            int result = query.executeUpdate();
            tx.commit();
            return result > 0;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public double calculateTotalBill(int pid, int quantity) {
        try (Session session = sessionFactory.openSession()) {
            String hql = "SELECT price FROM Product WHERE pid = :pid";
            Query<Double> query = session.createQuery(hql, Double.class);
            query.setParameter("pid", pid);
            Double price = query.uniqueResult();
            if (price != null) {
                return price * quantity;
            }
            return 0.0;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return 0.0;
        }
    }
}
