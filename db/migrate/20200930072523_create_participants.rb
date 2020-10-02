class CreateParticipants < ActiveRecord::Migration[5.1]
  def change
    create_table :participants do |t|
      t.string :name
      t.string :role
      t.string :email

      t.timestamps
    end
  end
end
